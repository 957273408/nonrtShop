var util = require('../../utils/util.js');
var api = require('../../config/api.js');
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: '',
    defaultKeyword: [], //默认搜索
    searchStatus: true,
    historyKeywordList: [], //历史列表
    hotKeywordList: [], //热门搜索
    helpKeyword:[],//模糊搜索匹配项
    filterCategory:[],//分类数据
    page: 1,
    size:20,
    currentSortType: 'id',
    currentSortOrder: 'desc',
    categoryId: 0,
    categoryFilter: false,
    currentSortType: 'default',
  },
  //获取搜索关键字
  getSearchKeyword() {
    let that = this;
    util.request(api.SearchIndex).then((res) => {
      console.log(res)
      if (res.errno === 0) {
        this.setData({
          defaultKeyword: res.data.defaultKeyword,
          historyKeywordList: res.data.historyKeywordList,
          hotKeywordList: res.data.hotKeywordList
        })
      }
    });
  },
  //搜索框事件
  inputChange(e) {
    this.setData({
      keyword: e.detail.value,
      searchStatus:false
    })
    this.getHelpKeyword();
  },
  getHelpKeyword(){
    util.get(api.SearchHelper, { keyword: this.data.keyword}).then(res=>{
      if(res.errno===0){
        this.setData({
          helpKeyword: res.data,
        })
      }
    })
  },
  clearKeyword(e) {
    this.setData({
      searchStatus:true,
      keyword: '',
    })
  },
  // 关闭搜索
  closeSearch() {
    wx.navigateBack()
  },
  onKeywordConfirm(e) {
    console.log(e)
  },
  inputBlur(e){
    if(!e.target.dataset.keyword) this.setData({
      searchStatus:true
    })
  },
  inputFocus(e) {
    this.setData({
      goodsList:[]
    })
    if(this.data.keyword){
      this.getHelpKeyword()
    }
  },
  //历史记录点击事件
  onKeywordTap(e) {
    this.getSearchResult(e.target.dataset.keyword);
  },
  // 跳转事件
  getSearchResult(keyword) {
    console.log(keyword)
    this.setData({
      keyword: keyword,
      page: 1,
      size:this.data.size,
      categoryId: 0,
      goodsList: []
    })
    this.getGoodsList()
  },
  // 获取搜索列表
  getGoodsList() {
    util.get(api.GoodsList, {
      keyword: this.data.keyword,
      page: this.data.page,
      size: this.data.size,
      sort: this.data.currentSortType,
      order: this.data.currentSortOrder,
      categoryId: this.data.categoryId,
      
    }).then(res=>{
      console.log(res)
      if(res.errno===0){
        this.setData({
          searchStatus:true,
          categoryFilter:false,
          goodsList:res.data,
          filterCategory: res.data.filterCategory,
          page: res.data.currentPage,
          size: res.data.pageSize
        })
      }
    })
  },
  // 清空历史记录的方法
  clearHistory() {
    this.setData({
      historyKeywordList: []
    })
    util.post(api.SearchClearHistory, {}).then(res => {
      console.log(res)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getSearchKeyword()
    // console.log(util)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})