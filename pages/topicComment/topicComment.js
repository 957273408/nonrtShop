let app= getApp()
let util=require('../../utils/util.js')
let api =require('../../config/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
    allCommentList: [],
    picCommentList: [],
    typeId: 0,
    valueId: 0,
    showType: 0,
    allCount: 0,
    hasPicCount: 0,
    allPage: 1,
    picPage: 1,
    size: 20
  },
  getCommentCount(){
    let { valueId, typeId}=this.data
    util.request(api.CommentCount,{valueId,typeId}).then(res=>{
      if(res.errno!=0) return
      this.setData(res.data)
    })
  },
  getCommentList(){

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {typeId,valueId}=options
    this.setData({
      typeId,
      valueId
    })
    this.getCommentCount()
    this.getCommentList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})