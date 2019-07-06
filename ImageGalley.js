import React, { Component } from 'react'
import Image from './Image'
import '../CSS/ImageGalley.css'
import { connect } from 'react-redux'

function mapStateToProps(state) {
    return {
        imgList: state.imgList,
        filterText: state.filterText
    }
}

//ImageGalley是无状态的, 它仅仅获取数据(imgList&filterText)并对数据做些处理，不对数据进行改动
export class ImageGalley extends Component {
    componentWillMount() {
        this.imgsToDisplay = [];
    }

    shouldComponentUpdate(nextProp, nextState) {
        //检查前后要显示的图片List是否一致，一致就不Update了(其实React自带这个优化)
        let beforeList = this.imgsToDisplay;
        let nowList = nextProp.filterText  
                ? nextProp.imgList.filter(ele => ele.name.toLowerCase().includes(nextProp.filterText.toLowerCase())) 
                : nextProp.imgList;
        this.imgsToDisplay = nowList;
        // 大部分情况下，如果前后List不一致是因为Length不一致
        if (beforeList.length !== nowList.length)
            return true;
        else {
            for (let ele of beforeList) 
                if (!nowList.includes(ele))
                    return true;
            return false;
        }
    }

    componentWillUpdate() {
        //console.log(`ImageGalley will update`)
    }
    
    render() {
        return (
            <div className="ImageGalley">
                {this.imgsToDisplay.map((imgFile, index) => <Image key={index} imgFile={imgFile} />)}
            </div>
        )
    }

    componentDidUpdate(prevProp, prevState) {
        console.log('ImageGalley Did Update')
    }
}

export default connect(mapStateToProps)(ImageGalley)
