from enum import Enum
from typing import List

from schemas import User, Pagination


class AccountType(str, Enum):
    CLIENT = "client"
    AUTHOR = "author"


class UserAccount(User):
    email: str
    accountType: AccountType


class UsersList(Pagination):
    data: List[UserAccount]
