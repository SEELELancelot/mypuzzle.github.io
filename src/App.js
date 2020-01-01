import React, {Component} from 'react';
import Mypuzzle from "./MyPuzzle/Mypuzzle";
import {Animal_puzzle} from "./Components";

class App extends Component {
    constructor(props) {
        super(props);
    }
    state={
        Mypuzzle_array:[],
    };


    componentDidMount() {
    //    引入圖片
        const mypuzzle_array=[];
        for (let i = 1; i <=10 ; i++) {
            const img=require("./Animal_img/"+i+".png");
            const puzzle=new Mypuzzle(img);
            // console.log(puzzle);
            mypuzzle_array.push(puzzle);
        }
        //設立狀態
        this.setState({
            Mypuzzle_array:mypuzzle_array
        });


    }

    render() {
        const {Mypuzzle_array}=this.state;

        if(Mypuzzle_array.length===0){
            console.log("資料準備中");
            return <h1>資料準備中</h1>
        }


        return (
            <div>
                {/*動物拼圖內容*/}
                <Animal_puzzle Mypuzzle_array={Mypuzzle_array}/>
                {/*<h1>{Mypuzzle_array[0].img}</h1>*/}
            </div>

        );
    }
}

export default App;
