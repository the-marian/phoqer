from time import time, sleep
from datetime import datetime, timedelta
from json import load, dumps
from typing import List

from fastapi import APIRouter, HTTPException, Response

from orders.schemas import OrderList, OrderBody, Order, UpdateOrderBody, Status
from utils import get_json_path, pagination

router = APIRouter(prefix="/orders", tags=["orders"])
json_file_path = get_json_path("orders")


@router.get("/client", response_model=OrderList)
@router.get("/author", response_model=OrderList)
async def get_orders(limit: int = 15, page: int = 1, status: str = "pending") -> OrderList:
    """Returns orders by status. User id should be parsed from jwt token"""
    with open(json_file_path) as json_file:
        orders = load(json_file)
        updated_orders = []

        for order in orders["data"]:
            if order['status'] == status:
                updated_orders.append(order)

        return pagination(updated_orders, limit, page)


@router.get("/chats/{chat_id}", response_model=OrderList)
async def get_orders_for_chat(limit: int = 15, page: int = 1) -> OrderList:
    """
    Returns orders by chat ID.
    When we open a chat with a person, the user should see a list of all previous orders in the side menu.
    Validate user id from jwt token
    """
    sleep(2)
    with open(json_file_path) as json_file:
        orders = load(json_file)
        return pagination(orders["data"], limit, page)


@router.put("/client/status", response_model=List[Order])
@router.put("/author/status", response_model=List[Order])
async def update_orders_status(body: UpdateOrderBody) -> List[Order]:
    """Update order status. User id should be parsed from jwt token"""
    with open(json_file_path) as json_file:
        orders = load(json_file)
        result = []

        for i, order in enumerate(orders["data"]):
            if order['id'] in body.ids:
                order['status'] = body.status
                order['startDate'] = None
                order['expired'] = datetime.timestamp(
                    datetime.now() + timedelta(days=14)) if body.status == 'rejected' else None
                orders["data"][i] = order
                result.append(order)

    if len(result) == 0:
        raise HTTPException(status_code=404, detail="Not found")

    with open(json_file_path, 'w') as json_file:
        json_file.write(dumps(orders, indent=4))

    return result


@router.put("/client/{order_id}", response_model=Order)
async def update_order(order_id: str, body: dict) -> Order:
    """Update order status. User id should be parsed from jwt token"""
    with open(json_file_path) as json_file:
        orders = load(json_file)
        result = None

        for i, order in enumerate(orders["data"]):
            if order['id'] == order_id:
                order.update(body)
                orders["data"][i] = order
                result = order
                break

    if result is None:
        raise HTTPException(status_code=404, detail="Not found")

    with open(json_file_path, 'w') as json_file:
        json_file.write(dumps(orders, indent=4))

    return result


@router.post("", status_code=204)
async def create_order(body: OrderBody) -> Response:
    with open(get_json_path("offers", "offers")) as offers_json_file:
        offers = load(offers_json_file)

        for offer in offers["data"]:
            if offer["id"] == body.offerId:
                new_order = offer
                new_order["user"] = offer['author']
                new_order["id"] = str(time())
                new_order["date"] = str(time())
                new_order["status"] = "pending"
                new_order["offerId"] = body.offerId
                new_order["country"] = body.country
                new_order["city"] = body.city
                new_order["zip"] = body.zip
                new_order["address"] = body.address
                new_order["comment"] = body.comment

                with open(json_file_path, 'r') as orders_json_file:
                    new_orders = load(orders_json_file)
                    new_orders['data'].insert(0, new_order)

                    json_data = dumps(new_orders, indent=4)

                    with open(json_file_path, 'w') as json_file:
                        json_file.write(json_data)

                return Response()


@router.post("/{order_id}", response_model=Order)
async def start_order(order_id: str) -> Order:
    """Start rent - from this moment rent is started. Only for authors! User id should be parsed from jwt token"""
    with open(json_file_path) as json_file:
        orders = load(json_file)
        result = None

        for i, order in enumerate(orders["data"]):
            if order['id'] == order_id:
                order['startDate'] = int(time() * 1000)
                order['status'] = Status.IN_PROGRESS.value
                orders["data"][i] = order
                result = order
                break

    if result is None:
        raise HTTPException(status_code=404, detail="Not found")

    with open(json_file_path, 'w') as json_file:
        json_file.write(dumps(orders, indent=4))

    return result
