import React, { ReactElement } from 'react';

import { createUseStyles } from 'react-jss';
import { Theme } from '../../../../assets/theme';



const useStyles = createUseStyles((theme: Theme) => ({
    container: {
        display: 'flex',
        width: '100%',
        maxWidth: theme.rem(120),
        margin: '0 auto',

        '@media (max-width: 1300px)': {
            width: '90%',
            maxWidth: 'unset',
        },
    },
    userInfo: {
        width: '65%',
        display: 'flex',
        flexWrap: 'wrap'
    },
    infoItems: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        marginBottom: theme.rem(1)
    },
    infoGoods: {
        color: '#999999'
    },
    infoOpinion: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.rem(1.5)
    },
    infoPercent: {
        fontSize: theme.rem(2),
        marginRight: theme.rem(1)
    },
    infoReputation: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.rem(2)
    },
    like: {
        color: theme.palette.green,
        display: 'flex',
        alignItems: 'center',
    },
    dislike: {
        marginLeft: theme.rem(4),
        color: theme.palette.red,
        display: 'flex',
        alignItems: 'center',
    },
    count: { 
         marginLeft: theme.rem(1)
    },
    titleInfo: {
        marginBottom: theme.rem(1),
        fontSize: theme.rem(1.1),
    }
}));

const UserInfo = (): ReactElement => {

    const css = useStyles();

    return (
            <div className={css.container}>
                <div className={css.userInfo}>
                    <div className={css.infoItems}>
                        <div> <span className={css.infoGoods}>Соответствие товара с описанием:</span> 5/5</div>
                        <div> <span className={css.infoGoods}>Коммуникация:</span> 5/5</div>
                        <div> <span className={css.infoGoods}>Скорость отклика:</span> в течение часа</div>
                    </div>
                    <div className={css.infoOpinion}>
                        <div className={css.infoPercent}>97,96 %</div>
                        <div>посоветовали автора</div>
                    </div>
                    <div className={css.infoReputation}>
                        <button className={css.like}>
                            <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 20H17C17.83 20 18.54 19.5 18.84 18.78L21.86 11.73C21.95 11.5 22 11.26 22 11V9C22 7.9 21.1 7 20 7H13.69L14.64 2.43L14.67 2.11C14.67 1.7 14.5 1.32 14.23 1.05L13.17 0L6.58 6.59C6.22 6.95 6 7.45 6 8V18C6 19.1 6.9 20 8 20ZM8 8L12.34 3.66L11 9H20V11L17 18H8V8ZM0 8H4V20H0V8Z" fill="black" />
                            </svg> 
                            <div className={css.count}>144</div>
                        </button>
                        <button className={css.dislike}><svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 0H5C4.17 0 3.46 0.5 3.16 1.22L0.14 8.27C0.05 8.5 0 8.74 0 9V11C0 12.1 0.9 13 2 13H8.31L7.36 17.57L7.33 17.89C7.33 18.3 7.5 18.68 7.77 18.95L8.83 20L15.42 13.41C15.78 13.05 16 12.55 16 12V2C16 0.9 15.1 0 14 0ZM14 12L9.66 16.34L11 11H2V9L5 2H14V12ZM18 0H22V12H18V0Z" fill="black" />
                        </svg>
                        <div className={css.count}>3</div>
                        </button>
                    </div>
                    <div>
                        <h5 className={css.titleInfo}>Об Авторе</h5>
                        <p>Я Влад. Акробат. Я Влад. Акробат. Я Влад. Акробат.Я Влад. Акробат. Я Влад. Акробат. Я Влад. Акробат.
                        Я Влад. Акробат. Я Влад. Акробат. Я Влад. Акробат.
                        Я Влад. Акробат. Я Влад. Акробат. Я Влад. Акробат.Я Влад. Акробат. Я Влад. Акробат. Я Влад. Акробат. Я Влад. Акробат. Я Влад. Акробат. Я Влад. Акробат.Я Влад. Акробат. Я Влад. Акробат. Я Влад. Акробат.  Я Влад. Акробат. Я Влад. Акробат. Я Влад. Акробат.Я Влад. Акробат. Я Влад. Акробат. Я Влад. Акробат. Я Влад. Акробат. Я Влад. Акробат. Я Влад. Акробат.Я Влад.

                        </p>
                    </div>
                </div>
            </div>

    )
};

export default UserInfo;