// pages/news/news.js
import {queryNews} from "../../api/apis"
import {formatNum,formatTime} from "../../utils/common"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsArr:[],
    loading:false,
    isData:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getNewsData()
  },
  //获取新闻列表
  getNewsData(size=0){
    this.setData({
      loading:true
    })
    queryNews({
      limit:8,
      size
    }).then((res)=>{
      res.data.forEach(item=>{
        item.view_count = formatNum(item.view_count)
        item.publish_date = formatTime(item.publish_date,5)
      })
      let oldData = this.data.newsArr;
      let newData = [...oldData,...res.data]
      //停止下拉刷新
      wx.stopPullDownRefresh();
      this.setData({
        newsArr:newData,
        loading:false
      })
      //数据加载完毕
      if(this.data.newsArr.length == res.total){
           this.setData({
             isData:true
           })
      }
    })
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

   /**
    * 用户下拉刷新 数据恢复初始状态
    */
  onPullDownRefresh() {
    this.setData({
      newsArr:[],
      isData:false,
      loading:false
    })
    this.getNewsData()
  },

  /**
   * 页面上拉触底事件的处理函数
   * 页面触底加载更多
   */
  onReachBottom() {
    if(this.data.isData) return;
    this.getNewsData(this.data.newsArr.length)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})