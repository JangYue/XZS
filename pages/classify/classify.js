// pages/classify/classify.js
import {listNav,queryProduct} from "../../api/apis"
let navid;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navActive:0,
    navArr:[],
    proArr:[],
    loading:false,
    isData:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
  let {idx} = options;
   await  this.getNavList();
   // 从首页过来
   if(idx){
    this.navChange(idx)
   }else{
     //  直接进入分类页面不需要带入数据
    navid = this.data.navArr[0]._id;
    this.getProductList();
   }
   
  },
  // 获取分类导航
  async getNavList(){
    await listNav().then((res)=>{
      this.setData({
        navArr:res.data
      })
      this.selectComponent('#myTabs').resize()
    })
  },
// 获取产品列表
getProductList(s=0){
  // 一触底loading 显示
  this.setData({
    loading:true
  })
  queryProduct({
    navid:navid, //分类ID
    size:s
  }).then((res)=>{
    let oldArr = this.data.proArr;
    let newArr = oldArr.concat(res.data)
    this.setData({
      proArr:newArr,
      // 数据请求成功后 loading false
      loading:false
    })
    // 接口没有新的数据
    if(res.total == this.data.proArr.length){
      this.setData({
        isData:true
      })
    }
  })
},
//导航条切换事件
navChange(e){
  let index = e?.detail?.index ?? e;
  navid = this.data.navArr[index]._id;
  this.setData({
    proArr:[],
    loading:false,
    isData:false,
    navActive:Number(index)
  })
  this.getProductList();
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    // 上拉触底时 没有数据 直接返回
    if(this.data.isData) return;
    this.getProductList(this.data.proArr.length);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})