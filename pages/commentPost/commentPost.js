let util= require('../../utils/util.js')
let api = require('../../config/api.js')
let app= getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:'',
    typeId:0,
    valueId:0,
  },
  bindInputValue(e){
    let value=e.detail.value
    if(value&&value.length>140) return
    this.setData({
      value
    })
  },
  onClose(){
    wx.navigateBack({
      delta: 1,
    })
  },
  onPost(){
    if(!this.data.value){
      util.showErrorToast('请填写评论')
      return
    }
    util.request(api.CommentPost,{
      typeId:this.data.typeId,
      valueId: this.data.valueId,
      value: this.data.value,
    },'POST').then(res=>{
      if(res.errno!==0)  {
        util.showErrorToast(res.errmsg)
        return
      }
      wx.showToast({
        title: '评论成功',
        complete(){
          wx.navigateBack({
            delta: 1,
          })
        }
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      typeId:parseInt(options.typeId),
      valueId:parseInt(options.valueId),
    })
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