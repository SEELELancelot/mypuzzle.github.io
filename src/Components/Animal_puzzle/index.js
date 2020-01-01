import React, {Component} from 'react';
import backCard from '../../Animal_img/back.png'
import './puzzle.css'
import Mypuzzle from "../../MyPuzzle/Mypuzzle";

class Animal_puzzle extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        Mypuzzle_array: [],
        disable: false,
        game_end: false
    };

    //將牌初始化
    card_init() {
        const {Mypuzzle_array} = this.props;
        let new_puzzle_array = [];
        for (let i = 0; i < Mypuzzle_array.length * 2; i++) {
            let obj = {};
            let {_id, _img, _hide} = Mypuzzle_array[parseInt(i / 2)];
            // console.log(_id,_img,_hide);
            obj = {
                _id: _id,
                _img: _img,
                _hide: _hide,
                _isclick: false
            };
            new_puzzle_array.push(obj);
        }
        this.card_wash(new_puzzle_array);
        return new_puzzle_array
    }

    //將牌洗亂
    card_wash(card_array) {

        let temp = null;
        //交換
        for (let i = 0; i < 1000; i++) {
            //0-19
            let random1 = parseInt(Math.random() * card_array.length);
            let random2 = parseInt(Math.random() * card_array.length);
            temp = card_array[random1];
            card_array[random1] = card_array[random2];
            card_array[random2] = temp;
        }

    }

    componentDidMount() {
        const new_puzzle_array = this.card_init();
        this.setState({
            Mypuzzle_array: new_puzzle_array
        });
    }

    img_click = (dom, index) => {
        const {Mypuzzle_array, disable} = this.state;
        if (disable) {
            return;
        }
        //重複點
        if (!Mypuzzle_array[index]._hide) {
            console.log("重複點");
            return;
        }
        Mypuzzle_array[index]._isclick = true;

        Mypuzzle_array[index]._hide = false;

        if (this.card_have_num() % 2 === 0) {
            const isClick_array = this.find_is_click();
            Mypuzzle_array[isClick_array[0]]._isclick = false;
            Mypuzzle_array[isClick_array[1]]._isclick = false;
            this.setState({
                disable: true
            });
            if (Mypuzzle_array[isClick_array[0]]._img !== Mypuzzle_array[isClick_array[1]]._img) {
                let obj = {
                    Mypuzzle_array: Mypuzzle_array,
                    index1: isClick_array[0],
                    index2: isClick_array[1]
                };
                setTimeout(this.animate_end, 1500, obj);
            } else {
                this.setState({
                    disable: false
                })
            }


        }


        this.game_victroy();

    };

    game_victroy = () => {
        let game_end = true;
        for (let i = 0; i < this.state.Mypuzzle_array.length; i++) {
            if (this.state.Mypuzzle_array[i]._hide) {
                game_end = false;
                break;
            }
        }
        console.log(game_end);
        this.setState({
            game_end: game_end
        })
    };

    card_have_num() {
        let num = 0;
        for (let i = 0; i < this.state.Mypuzzle_array.length; i++) {
            if (!this.state.Mypuzzle_array[i]._hide) {
                num++;
            }
        }
        return num;
    }

    find_is_click = () => {
        const isClick_array = [];
        for (let i = 0; i < this.state.Mypuzzle_array.length; i++) {
            if (this.state.Mypuzzle_array[i]._isclick) {
                isClick_array.push(i);
            }
        }
        return isClick_array;
    };

    animate_end = (obj) => {
        obj.Mypuzzle_array[obj.index1]._hide = true;
        obj.Mypuzzle_array[obj.index2]._hide = true;

        this.setState({
            Mypuzzle_array: obj.Mypuzzle_array,
            disable: false
        })
    };

    render() {
        const {Mypuzzle_array, game_end} = this.state;
        const show_text = game_end ? "block" : "none";
        return (
            <div>
                <div>
                    <h1 style={{display: show_text, textAlign: "center"}}>遊戲結束</h1>

                </div>
                <div className={"flex mypuzzle_div"}>
                    {
                        Mypuzzle_array.map((puzzle, index) => {
                            let img = puzzle._hide ? backCard : puzzle._img;
                            return (
                                <img className={"puzzle_img"} onClick={(event) => this.img_click(event, index)}
                                     src={img}
                                     alt="" width={100} height={100} key={index}/>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}

export default Animal_puzzle;