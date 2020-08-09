import extend from 'extend'
import GuestAPI from './guest-api.json'

// NOTE: 游客标识，1代表未登录游客，0代表已登录
const isGuest = window._guest==='1'

let APIS = /* <encrypt> */{
	common : {
		userInfo   : 'GET:/v1.0/common/userinfo',     // 导航栏昵称，头像，角色
		info       : 'GET:/v1.0/common/info',         // pc端个人端导航栏下拉信息
		phone_info : 'GET:/v1.0/common/phone_info',   //微信端个人公共信息
		menu       : 'GET:/v1.0/common/menu',         // 获取权限菜单
		schoolLogo : 'GET:/v1.0/logo',                // 学校logo获取
		login      : 'POST:/v1.0/login',              // 登陆方法
		captcha    : 'GET:/v1.0/captcha',             // 登录验证码
		banner     : 'GET:/v1.0/banner/code',         // 上传服务
		deptTree   : 'GET:/v1.0/common/dept_tree',    // 管理端部门树获取
		users      : 'GET:/v1.0/common/users',        // 查询当前部门下所有用户
		userList   : 'GET:/user/managePageList',      // 查询运营用户列表
		loginByAdmin : 'GET:/loginByAdmin',    		  // 前台登录
		logoInfo   :'GET:/logo/info',				  //版权信息
	},
	wisdom : {
		list:'GET:/v1.0/courseshow/listPageForWisdomPersonCenter' //威德
	},
	category : {
		query         : 'GET:/v1.0/category/list',               // 查询树表
		del           : 'DELETE:/v1.0/category/',                // 删除请求ajaxDataDel
		modify        : 'PUT:/v1.0/category',                    // 修改请求ajaxDataPut
		add           : 'POST:/v1.0/category/',                  // 新增节点ajaxDataPost
		// max           : "GET:/v1.0/category/max",                // 查询最大id数
		// frequentLabel : 'GET:/v1.0/category/frequentLabel',      // 查询常用的三个标签
		// frequent      : 'GET:/v1.0/category/frequentCategory',   // 查询最常使用的资源分类
	},
	source : {
		// userinfo            : 'GET:/v1.0/source/userinfo',                              // 首页查询头像，名称
		sourcelist          : 'POST:/v1.0/source/sourceList',                           // 管理端资源列表
		delSource           : 'DELETE:/v1.0/source/{sourceId}',                         // 管理端删除资源
		querySchool         : 'GET:/v1.0/source/schools',                               // 请求学校列表
		queryDepartment     : 'POST:/v1.0/common/selectAcdemyList',                     // 查询系列表
		querySection        : 'POST:/v1.0/common/departmentList',                       // 查询部门列表
		queryMajor          : 'POST:/v1.0/common/selectSpecialtyList',                  // 查询专业列表
		queryGrade          : 'POST:/v1.0/common/selectGradeList',                      // 查询年级列表
		queryClass          : 'POST:/v1.0/common/selectClassList',                      // 查询班级列表
		// querySourceCategory : 'POST:/v1.0/category/getList',                            // 查询资源分类
		querySourceFormat   : 'GET:/v1.0/common/selectFormatList',                      // 查询资源格式
		reTry               : 'POST:/v1.0/source/reTry',                                // 资源重新转码
		fileUrl             : 'POST:/v1.0/source/fileUrl',                              // 请求资源预览路径和文件类型来展示预览
		sourceDetail        : 'GET:/v1.0/source/detailData/{appId}/{sourceId}',         // 管理端资源详情列表
		lastResource        : 'GET:/v1.0/source/lastTenList',                           // 获取最新10条资源数据
		check               : 'POST:/v1.0/source/check',                                // 管理端资源审核
		checks              : 'POST:/v1.0/source/checks?sourceIdList={sourceIdList}',   // 管理端资源批量审核
		push                : 'POST:/v1.0/source/push',                                 // 管理端资源推送
	},
	soruceUpload : {
		// upload        : '/v1.0/source/uploading',         // 资源上传
		// queryCategory : '/v1.0/common/getCategoryList',   // 资源上传填写信息时分类
		// saveInfo      : '/v1.0/source/saveResource',      // 管理端资源保存
		update        : 'POST:/v1.0/source/update',       // 管理端详情修改
		imageUpload   : '/v1.0/source/uploadImg',         // 视频封面路径上传
	},
	personSource : {
		delPersonSource  : 'DELETE:/v1.0/person/{sourceId}',                   // 个人端删除资源
		queryList        : 'POST:/v1.0/person/queryList',                      // 个人端列表分页查询
		// listData         : 'GET:/v1.0/person/personListData',                  // 个人端列表总数据
		reTry            : 'POST:/v1.0/person/reTry',                          // 个人端资源重新转码
		queryNewFourList : 'POST:/v1.0/person/fourListByCreateTime',           // 个人端首页获取最新4个资源数据
		queryHotFourList : 'POST:/v1.0/person/fourListByReadCount',            // 个人端首页获取浏览次数最多的4条资源
		fileUrl          : 'POST:/v1.0/person/fileUrl',                        // 个人端请求资源预览路径和文件类型来展示预览
		personDetail     : 'GET:/v1.0/person/detailData/{sourceId}',           // 个人端资源详情列表
		getNewSourceList : 'POST:/v1.0/person/getNewSourceListByCreateTime',   // 根据类型获取资源
		pickQueryList    : 'POST:/v1.0/person/querySourceList'                 // 选择资源分页查询
	},
	personSourceUpload : {
		upload        : '/v1.0/person/uploading',             // 个人端资源上传
		// saveInfo      : 'POST:/v1.0/person/saveResource',     // 个人端资源保存
		saveInfo      : 'POST:/v1.0/person/saveSourceInfo',   // 个人端资源保存
		queryCategory : 'GET:/v1.0/common/getCategoryList',   // 个人端资源上传填写信息时分类
		update        : 'POST:/v1.0/person/update',           // 个人端详情修改
		imageUpload   : '/v1.0/person/uploadImg',             // 个人端视频封面路径上传
		multiUpload   : '/v1.0/person/uploads',               // 个人端批量上传
	},
	qingtong:{
		owner:'POST:/pc/qingtong/course/owner' //青铜学院分页获取已购买课程
	},
	statistics : {
		weekData  : 'GET:/v1.0/source/week',    // 折线周数据
		monthData : 'GET:/v1.0/source/month',   // 折线月数据
	},
	browse : {
		shareList : 'POST:/v1.0/share/list',      // 游客访问资源列表
		fileUrl   : 'POST:/v1.0/share/fileUrl',   // 游客端获取资源预览地址
	},
	mixin : {
		personIndex  : 'GET:/v1.0/person/personIndexData',
		manageIndex  : 'GET:/v1.0/source/manageIndexData',
		personUpload : '/v1.0/person/sourceUploadData'
	},

	//管理端课程操作
	regulate : {
		courseList    : 'POST:/v1.0/course/pagefordept',           // 部门分配的课程列表
		save          : 'POST:/v1.0/coursedept/addCourseList',     // 为部门分配课程
		totalCourse   : 'POST:/v1.0/course/pageforadmin',          // 总课程列表
		download      : 'POST:/v1.0/course/downforadmin',          // 总课程列表根据条件筛选下载
		updatePrice   : 'POST:/v1.0/course/updatePrice',           // 总课程列表更新课程价格

		OpenCourseList: 'GET:/v1.0/courseOpen/courseList',         // 开通课程 - 根据部门id获取课程
		deptList	  : 'GET:/v1.0/courseOpen/deptList',           // 开通课程 - 知悦下的部门树
		add	  		  : 'POST:/v1.0/courseOpen/add',           	   // 开通课程 - 个人开通课程
		list	  	  : 'GET:/v1.0/courseOpen/list',               // 开通课程 - 已开通课程
		batAdd	  	  : 'POST:/v1.0/courseOpen/batAdd',            // 开通课程 - 批量开通课程
	},

	//学生端
	study : {
		// courseQuery : 'POST:/v1.0/course/pageforstudent',                // 分页获取课程(学生端)
		// courseInfo  : 'GET:/v1.0/course/detail/forstudent/{courseId}',   // 课程学生端详情
		catalog     : 'GET:/v1.0/catalog/listWithSourceForStudent',      // 获取学生端课程目录

		fileUrl     : 'POST:/v1.0/learnsource/fileUrl',                  // 学习资源地址获取

		learnLog    : 'GET:/v1.0/courselearnlog/getsourcelearnlog',      // 学习日志查询
		learnRepo   : 'POST:/v1.0/courselearnlog/addcourselearnlog',     // 学习日志上报
		totalTime   : 'GET:/v1.0/courselearnlog/personalstats',          // 学习课程总时长
	},

	// 微信端
	wechat : {
		bind      : 'POST:/wechat/bind',                   // 微信和账号绑定
		config    : 'GET:/wechat/jssdk/config',            // 微信jssdk配置
	},

	// 课程
	course : {
		query    : 'POST:/v1.0/course/page',
		add      : 'POST:/v1.0/course/add',
		info     : 'GET:/v1.0/course/detail/{courseId}',
		update   : 'POST:/v1.0/course/update',
		del      : 'POST:/v1.0/course/delete',
		batchadd : 'POST:/v1.0/catalog/addList',
		videoSet : 'POST:/v1.0/course/videoSet',
		updatePrice: 'POST:/v1.0/course/updatePrice',
		coupon	 : 'GET:/v1.0/course/coupon/pageList',
		stop     : 'POST:/v1.0/course/coupon/stop',
		batStop  : 'POST:/v1.0/course/coupon/batStop',
		allUserList:'GET:/v1.0/course/coupon/allUserList',
		send     : 'POST:/v1.0/course/coupon/send',
		serachUser:'GET:/v1.0/course/coupon/serachUser',
		categoryList:'GET:/v1.0/course/categoryList',
		coursePage:'GET:/course/coursePage',                      //通过分类或课程名查询课程
		update_category:'POST:/course/update_category',           //修改课程分类名称
		deleteCategory:'POST:/course/deleteCategory',             //删除课程分类名称
		categoryPage:'GET:/course/categoryPage',                  //查询课程分类列表
		addCategory:'POST:/course/addCategory',                    //添加课程分类
		// 学生端
		student: {
			query : 'POST:/v1.0/course/pageforstudent',                // 我的课程
			study : 'POST:/v1.0/course/pageforstudentstudy',           // 已学课程
			info  : 'GET:/v1.0/course/detail/forstudent/{courseId}',   // 课程学生端详情
			vip   : 'POST:/v1.0/course/pageforvip',                    // 我的课程vip尊享列表
		}
	},

	// 课程目录
	courseCatalog : {
		list   : 'GET:/v1.0/catalog/listWithSource',
		add    : 'POST:/v1.0/catalog/add',
		update : 'POST:/v1.0/catalog/update',
		del    : 'POST:/v1.0/catalog/delete',
	},

	// 课程资源
	courseRes : {
		add     : 'POST:/v1.0/learnsource/add',
		addList : 'POST:/v1.0/learnsource/addList',
		update  : 'POST:/v1.0/learnsource/update',
		del     : 'POST:/v1.0/learnsource/delete'
	},

	// 练习
	exercise : {
		query   : 'GET:/v1.0/exercise/list',           // 创建的练习列表（教师端）
		add     : 'POST:/v1.0/exercise/add',           // 添加练习
		update  : 'POST:/v1.0/exercise/update',        // 更新练习
		del     : 'POST:/v1.0/exercise/delete',        // 删除练习
		list    : 'GET:/v1.0/exercise/{exerciseId}',   // 练习明细列表
		student : {
			query   : 'GET:/v1.0/exercise/listforstudent',            // 练习列表（学生端）
			list    : 'GET:/v1.0/exercise/forstudent/{exerciseId}',   // 练习明细（学生端）
			submit  : 'POST:/v1.0/check/submit',                      // 提交练习(学生端)
			commit  : 'POST:/v1.0/check/add',                         // 实时提交答案(学生端)
			history : 'GET:/v1.0/check/listCheckLog',                 // 练习历史列表
			review  : 'GET:/v1.0/check/getCheckLogDetail',            // 历史练习详情
		}
	},

	// 科目
	subject: {
		list   : "GET:/v1.0/subject/getList",              // 考试科目列表
		add    : "POST:/v1.0/subject/add",                 // 考试科目新增
		update : "POST:/v1.0/subject/update",              // 考试科目更新
		del    : "POST:/v1.0/subject/delete",              // 考试科目删除
		info   : "GET:/v1.0/subject/detail/{subjectId}",   // 编辑考试科目查询该科目信息
	},

	// 习题
	question: {
		add    : 'POST:/v1.0/questionStore/add',            // 添加习题
		query  : 'GET:/v1.0/questionStore/page',            // 分页查询习题
		info   : 'GET:/v1.0/questionStore/{questionId}',    // 获取习题信息
		update : 'POST:/v1.0/questionStore/update',         // 更新习题
		del    : 'POST:/v1.0/questionStore/delete',         // 删除习题
		import : 'POST:/v1.0/questionStore/excel',          // 导入习题
		parse  : 'POST:/v1.0/questionStore/exercise_excel'  // 导入习题，返回列表（不保存）
	},

	feedback: {
		add    : 'POST:/v1.0/feedback/add',            // 错题上报
		query  : 'GET:/v1.0/feedback/page',            // 分页查询错题列表
		del    : 'POST:/v1.0/feedback/delete',         // 删除及批量删除错题上报记录
		export : 'POST:/v1.0/feedback/downforadmin',   // 导出错题反馈列表
	},

	//学习统计
	learnStat: {
		durationQuery : 'GET:/v1.0/courselearnlog/deptstats',        // 人员学习时长
		durationDown  : 'POST:/v1.0/courselearnlog/deptstatsdown',   // 人员学习excel下载
	},

	//公告
	notice:{
		add       : 'POST:/v1.0/notice/add',                // 添加公告
		query     : 'GET:/v1.0/notice/pageForDept',         // 根据部门查询公告列表
		info      : 'GET:/v1.0/notice/detail/{noticeId}',   // 获取公告详情
		read      : 'GET:/v1.0/notice/read/{noticeId}',     // 阅读公告，与详情接口返回一致，并标记为已读
		update    : 'POST:/v1.0/notice/update',             // 更新公告
		del       : 'POST:/v1.0/notice/delete',             // 公告删除
		noread    : 'GET:/v1.0/notice/noreadCount',         // 未读公告数量
		pushed    : 'GET:/v1.0/notice/forUserPush',         // 获取推送的通知，未推送过
		userQuery : 'GET:/v1.0/notice/pageForUser',         // 用户公告分页
		readed    : 'POST:/v1.0/notice/updateReadInfo',     // 标记公告为已读
	},

	login:{
		getCode  : 'POST:/sms/send',        // 手机端获取验证码
		resetPwd : 'POST:/sms/reset_pwd',   // 重置密码
	},

	register:{
		getCode  : 'POST:/register/send_phone', //用户注册获取验证码
		done     : 'POST:/register/success', //注册
		send_phone  : 'POST:/platform_OpenApply/send_phone', //用户注册获取验证码
		add     : 'POST:/platform_OpenApply/add', //注册
		getVerify: 'GET:/v1.0/commonApi/getVerifyCode',//获取动态码
	},
	// 高师联盟
	teacherUnion:{
		getLeague  : 'GET:/wechat/queryGsList',  // 获取高师联盟列表
		getModel   : 'GET:/commonWechat/findDeptRoles',//点击后跳转返回获取单个省的部门及权限数据
		// NOTE: 开放游客访问后已无用
		// isLogin	   : 'GET:/wechat/haveLogin',//判断是否已授权登陆
		setDept   : 'POST:/commonWechat/change_dept',   // 切换部门
	},

	// 区域管理
	area:{
		add    : 'POST:/v1.0/showtype/add',          // 添加区域
		query  : 'GET:/v1.0/showtype/list',          // 区域列表
		info   : 'GET:/v1.0/showtype/detail/{id}',   // 获取区域详情
		del    : 'POST:/v1.0/showtype/delete',       // 删除区域
		update : 'POST:/v1.0/showtype/update',       // 修改区域
	},

	// 区域对应推荐内容
	recommend:{
		query  : 'GET:/v1.0/courseshow/listPageForAdmin',   // 获取区域推荐课程
		del    : 'POST:/v1.0/courseshow/delete',            // 删除该区域推荐课程
		update : 'POST:/v1.0/courseshow/update',            // 更新该区域推荐课程
		area   : 'GET:/v1.0/courseshow/listWithShowType',   // 获取区域列表
		push   : 'POST:/v1.0/courseshow/batchUpdate',       // 推送数据
		listPage: 'GET:/v1.0/courseshow/listPageForPersonCenter',       // 个人中心区域推荐课程列表分页
		listPageNew:'GET:/v1.0/courseshow/listPageForPersonCenterNew', // 个人中心猜你喜欢列表
		listPageForPersonCenterByDomain:'GET:/v1.0/courseshow/listPageForPersonCenterByDomain', // 根据域名获取首页运营区域内容
		listPageForUser:'GET:/v1.0/courseshow/listPageForUser', // 根据域名获取首页分类课程内容
		pageforstudent:'GET:/v1.0/course/pageforstudent',	   // 根据域名获取分配的课程内容用户
		listByDomain:'GET:/v1.0/courseshow/listByDomain', // 根据部门获取全部课程的showId
		qy_list:'GET:/personal_center/qy_list', // 企业列表
		gx_list:'GET:/personal_center/gx_list', // 企业列表
		student   : {
			query : 'GET:/v1.0/courseshow/listPageForUser'  // 获取推送列表分页
		}
	},


	// 订单
	order:{
		queryAdmin : 'GET:/v1.0/order/getListPageForAdmin',   // 后台订单列表
		download   : 'GET:/v1.0/order/downforadmin',          // 管理员下载订单
		queryUser  : 'GET:/v1.0/order/getListPageForUser',    // 用户订单列表
		pay        : 'POST:/v1.0/order/payOrder',             // 确认下单支付
		info       : 'POST:/v1.0/order/detail',               // 获取订单详情
		detail     : 'POST:/v1.0/order/info',                     // 获取订单详情
		payOrder   : 'POST:/v1.0/mobileOrder/payOrderByWeixin', //统一支付
		payOrderByCurrency: 'POST:/v1.0/order/payOrderByCurrency',  // 虚拟币购买课程
	},

	// 个人中心
	center:{
		queryDept : 'GET:/personal_center/dept_list',      // 根据不同域名获取用户部门列表
		setDept   : 'POST:/personal_center/change_dept',   // 切换部门
		untie     : 'GET:/personal_center/unbind',         // 账号解绑
		info      : 'GET:/personal_center/user_info',      // 获取用户个人信息
		sendPhone : 'POST:/personal_center/send_phone',    // 发送手机验证码
		sendEmail : 'POST:/personal_center/send_email',    // 发送邮箱验证码,
		editInfo  : 'POST:/personal_center/edit_user',     // 修改性别,生日,手机号,邮箱
		editpwd   : 'POST:/personal_center/edit_pwd',      // 修改密码，
		data   	  : 'GET:/personal_center/getListPageForSelf',      // 我的订单数据
		svip      : 'GET:/v1.0/vip/wechatVipList',  //vip信息
		// pay       : 'POST:/v1.0/vip/payEdit',  				//开通会员支付
		pay       : 'POST:/v1.0/mobile/vip/payEdit',  				//开通会员支付
		vipResult : 'GET:/v1.0/vip/vipResult',  		   //支付结果
		getCount  : 'GET:/personal_center/getListCountPageForSelf' ,//个人课程订单统计
		qy_list   : 'GET:/personal_center/qy_list',  		   //获取企业地址
		getRoomCourse : 'GET:/live/student/getLiveRoomByStudents', //学员获取直播间时间
		getRoomTime : 'GET:/live/student/getLiveRoomCourseByStudents' //学员获取直播间时间
	},

	//考点管理
	site:{
		query  : 'GET:/v1.0/exam/address/queryList',            //查询考点列表
		add    : 'POST:/v1.0/exam/address/add',                 //新增考点
		del    : 'POST:/v1.0/exam/address/delete',              //删除考点
		update : 'POST:/v1.0/exam/address/update',              //修改考点
		info   : 'GET:/v1.0/exam/address/detail/{addressId}',   //获取考点明细
	},

	//监考员管理
	proctor:{
		query     : 'GET:/v1.0/exam/proctor/queryList',     //查询监考员列表
		add       : 'POST:/v1.0/exam/proctor/add',          //新增监考员
		del       : 'POST:/v1.0/exam/proctor/delete',       //删除监考员
		update    : 'POST:/v1.0/exam/proctor/update',       //修改监考员
		info      : 'GET:/v1.0/exam/proctor/detail/{id}',   //获取监考员明细
		import    : 'POST:/v1.0/exam/proctor/excel',        //批量导入监考员
		queryList : 'GET:/v1.0/exam/proctor/list',          //查询监考员列表（排除总监考员）
	},

	//试卷组管理
	group:{
		query           : 'GET:/v1.0/exam/paper_group/queryList',          //试卷组列表
		queryForSubject : 'GET:/v1.0/exam/paper_group/list/{subjectId}',   //查询对应课程的试卷组名称列表
		add             : 'POST:/v1.0/exam/paper_group/add',               //添加试卷组
		del             : 'POST:/v1.0/exam/paper_group/delete',            //删除试卷组
		info            : 'GET:/v1.0/exam/paper_group/detail/{groupId}',   //获取试卷组明细
		update          : 'POST:/v1.0/exam/paper_group/update',            //修改试卷组
	},

	//试卷管理
	paper:{
		query : 'GET:/v1.0/exam/paper/queryList',   //获取试卷列表
		add   : 'POST:/v1.0/exam/paper/add',        //添加试卷
		del   : 'POST:/v1.0/exam/paper/delete',     //批量删除
	},

	//考试组织发布
	issue:{
		query              : 'GET:/v1.0/exam/queryList',                       //发起的考试列表
		add                : 'POST:/v1.0/exam/add',                            //添加新的考试
		info               : 'GET:/v1.0/exam/detail/{examId}',                 //考试明细
		update             : 'POST:/v1.0/exam/update',                         //编辑考试明细
		subject_group      : 'GET:/v1.0/exam/group_list/{examId}',             //获取考试科目和对应试卷组ID列表
		save_subject_group : 'POST:/v1.0/exam/addList',                        //新增考试试卷组关系列表
		addressOption      : 'GET:/v1.0/exam/address/list',                    //获取考点下拉列表
		addressList        : 'GET:/v1.0/exam/address_list/{examId}',           //查询考试对应考点列表
		delAddress         : 'POST:/v1.0/exam/student/delete_address',         //删除对应考试的考点（包括该考点信息及相应考生）
		addAddress         : 'POST:/v1.0/exam/address_add',                    //添加考试考点
		ads_stu_list       : 'GET:/v1.0/exam/address_student_list/{examId}',   //查询考试对应考点的考生信息
		querySubjectList   : 'GET:/v1.0/exam/student/subject/{examId}',        //根据考试ID获取考试所有科目列表{返回试卷组id，科目名}
		subjectList        : 'GET:/v1.0/exam/subject_list/{examId}',           //根据考试ID获取考试所有科目列表{返回科目id，科目名}
		proctorList        : 'GET:/v1.0/exam/proctor_list/{examId}',           //查询考试对应考点的监考员列表
		proctorRandom      : 'POST:/v1.0/exam/make_proctor',                   //考试随机监考员
		saveProctorList    : 'POST:/v1.0/exam/add_proctor',                    //考试-保存监考员列表
		proctorDown        : 'GET:/v1.0/exam/down_proctor',                    //考试-导出监考员列表
		release            : 'POST:/v1.0/exam/issue',                          //考试-发布考试
		score              : 'GET:/v1.0/exam/score_list',                      //考试-成绩查看
		scoreDown          : 'GET:/v1.0/exam/down_score',                      //考试-导出成绩列表
		status             : 'GET:/v1.0/exam/status/{examId}',                 //考试-获取考试状态
		addr_status        : 'GET:/v1.0/exam/addr_status',                     //考试-获取该场考试某个考点的考试状态
		notice             : 'POST:/v1.0/exam/updateNoticePhoto',              //考试-须知图片设置
		log                : 'GET:/v1.0/exam/log/list',                        //考试-监考员操作日志
		record             : 'GET:/v1.0/exam/record/list',                     //考试-考场记录单
		recordDetail       : 'GET:/v1.0/exam/record/{recordId}',               //考试-查询考场记录单详情
	},

	//考生
	student:{
		import : 'POST:/v1.0/exam/student/excel',      //考生批量导入
		query  : 'GET:/v1.0/exam/student/queryList',   //考生列表
		add    : 'POST:/v1.0/exam/student/add',        //添加考生
		info   : 'GET:/v1.0/exam/student/detail',      //根据id获取考生明细
		del    : 'POST:/v1.0/exam/student/delete',     //批量删除
		update : 'POST:/v1.0/exam/student/update',     //修改试卷组
		empty  : 'POST:/v1.0/exam/student/empty',      //清空考生
	},

	//评论
	comment:{
		add           : 'POST:/v1.0/comment/add',            //新增
		update        : 'POST:/v1.0/comment/update',         //更新评论
		pageforcourse : 'GET:/v1.0/comment/pageforcourse',   //学生分页查询
		pageforadmin  : 'GET:/v1.0/comment/pageforadmin'     //管理员分页查询
	},

	//企业培训平台注册
	registration:{
		getAll  : 'GET:/registration_list/getAll',     //注册列表
		check   : 'POST:/registration_status/check'    //企业培训注册信息审核
	},

	//考试数据分析
	analysis:{
		subject_amount  : 'GET:v1.0/exam/analysis/subject_amount',   //不合格科目人数分布
		student_amount  : 'GET:v1.0/exam/analysis/student_amount',   //student_amount
		subject         : 'GET:/v1.0/exam/analysis/subject',         //不合格科目总数
		student         : 'GET:/v1.0/exam/analysis/student',         //考生概况
		pass            : 'GET:/v1.0/exam/analysis/pass',            //生通过率概况
		exam_list       : 'GET:/v1.0/exam/list',                     //查询考场
		address_list    : 'GET:/v1.0/exam/address_list',             //考点列表
		analysis_export : 'GET:/v1.0/exam/analysis/export',          //导出表格,
	},

	//档案分类管理
	record:{
		recordsortadd              : 'POST:/v1.0/record/recordsortadd',               //添加档案
		recordsortquery            : 'GET:/v1.0/record/recordsortquery',              //查询档案
		recordsortupdte            : 'POST:/v1.0/record/recordsortupdte',             //更新档案
		recordsortdelete           : 'POST:/v1.0/record/recordsortdelete',            //删除档案
		recordtableattradd         : 'POST:/v1.0/record/recordtableattradd',          //添加档案自定义类型
		recordtableattrquery       : 'GET:/v1.0/record/recordtableattrquery',         //查询档案自定义类型
		recordtableattrupdate      : 'POST:/v1.0/record/recordtableattrupdate',       //更新档案自定义类型
		recordtableattrdelete      : 'POST:/v1.0/record/recordtableattrdelete',       //删除档案自定义类型
		recordquery                : 'GET:/v1.0/record/recordquery',                  //查询档案
		recorddelete               : 'POST:/v1.0/record/recorddelete',                //删除档案
		recordtemplateexport       : 'GET:/v1.0/record/recordtemplateexport',         // 档案导出
		recordLeadExcel            : 'POST:/v1.0/record/recordleadexcel',             // 档案导入
		recordDetail               : 'GET:/v1.0/record/detail/{recordId}',            // 档案明细
		recordUpdate               : 'POST:/v1.0/record/update',                      // 更新档案
		recordshowquery            : 'GET:/v1.0/record/recordshowquery',              // 档案共享
		recordsordshowquery        : 'GET:/v1.0/record/recordsordshowquery',          // 查询共享的档案分类
		getrecordunitnames         : 'GET:/v1.0/record/getrecordunitnames',           // 获取档案中的所有工作单位
		recordshowgetbydept        : 'GET:/v1.0/record/recordshowgetbydept',          // 获取某部门获得的共享档案分类的明细
		getrecordshowaddorupdate   : 'POST:/v1.0/record/getrecordshowaddorupdate',    // 添加/修改档案共享管理
		recordshowexport           : 'POST:/v1.0/record/recordshowexport',            // 共享档案导出
		recordsfeedbackadd         : 'POST:/v1.0/record/recordsfeedbackadd',          // 添加档案反馈
		recordsortqueryforfeedback : 'GET:/v1.0/record/recordsortqueryforfeedback',   // 查询档案分类to问题反馈
		recordqueryforfeedback     : 'GET:/v1.0/record/recordqueryforfeedback',       // 查询问题档案查询档案
		recordexportforfeedback    : 'GET:/v1.0/record/recordexportforfeedback',      // 导出有反馈的问题档案
	},

	//预约
	book:{
		query         : 'GET:/v1.0/exambook/list',                        //考试预约列表分页查询
		add           : 'POST:/v1.0/exambook/add',                        //添加新考试预约
		info          : 'GET:/v1.0/exambook/{examBookId}',                //根据预约id查询预约明细
		delbook           : 'POST:/v1.0/exambook/delete',                     // 根据预约id 删除该场预约
		update        : 'POST:/v1.0/exambook/edit',                       //编辑考试预约
		release       : 'POST:/v1.0/exambook/issue',                      //发布考试预约
		end           : 'POST:/v1.0/exambook/end',
		dateList      : 'GET:/v1.0/exambook/date/list/{examBookId}',      // 获取考试日期列表
		addDate       : 'POST:/v1.0/exambook/date/add',                   //保存考试日期
		delDate       : 'POST:/v1.0/exambook/date/delete',                //删除考试日期
		bookStatus    : 'GET:/v1.0/exambook/status/{examBookId}',         // 获取该场预约考试的状态
		bookInfoList  : 'GET:/v1.0/exambook/info/{examBookId}',           //根据预约id查询预约管理右边数据
		addr_list     : 'GET:/v1.0/exambook/address_list',                //预约管理考试地点下拉列表
		sub_list      : 'GET:/v1.0/exambook/subject_list/{examBookId}',   //预约管理考试科目下拉列表
		save          : 'POST:/v1.0/exambook/save',                       //预约管理保存
		student_list  : 'GET:/v1.0/exambook/student/list',                //查询考生管理列表
		student_add   : 'POST:/v1.0/exambook/student/add',                //添加新考
		student_edit  : 'POST:/v1.0/exambook/student/edit',               //编辑考生
		student_del   : 'POST:/v1.0/exambook/student/delete',             //编辑考生
		student_empty : 'POST:/v1.0/exambook/student/empty',              //清空考生
		student_excel : 'POST:/v1.0/exambook/student/excel',              //批量导入考生
		bookStudent   : 'GET:/v1.0/exambook/student/page',                //预约考试的考生明细
		delBookStudent: 'POST:/v1.0/exambook/detail/delete',              //删除预约考试的考生明细
		view_addrlist : 'GET:/v1.0/exambook/detail/address/list',         //根据考试id，日期Id查询预约考点列表
		view_time     : 'GET:/v1.0/exambook/detail/time/list',            //根据预约考试id，日期id，考点id查询预约时间段列表
		view_export   : 'GET:/v1.0/exambook/student/export',              //考试预约查看导出excel
		studentTpl_export:'GET:/v1.0/exambook/student/info/export',//导出考生考试模板的excel
		subject_list  : 'GET:/v1.0/exambook/subject_list/{examBookId}',   //查看考试科目列表

		student: {
			book         : 'GET:/v1.0/exambook/search',            // 学员可预约场次
			seatInfo     : 'GET:/v1.0/exambook/seat/info',         // 根据考试场次查询座位信息
			subjectInfo  : 'GET:/v1.0/exambook/subject_info',      // 根据座位号选择考试科目
			seatLock     : 'POST:/v1.0/exambook/seat/lock',        // 选择科目提交后锁定座位
			payInfo      : 'POST:/v1.0/exambook/pay/getPayInfo',   // 获取支付信息、支付页面打开就调用
			updateStatus : 'POST:/v1.0/exambook/seat/update',      // 更新状态
			ticket       : 'GET:/v1.0/exambook/ticket/export',     // 准考证
			scene_info   : 'GET:/v1.0/exambook/scene/info',        //查询我的预约日期列表
			info         : 'GET:/v1.0/exambook/info',              //查询不同日期预约信息
			my_book      : 'GET:/v1.0/exambook/my_book',           //查询我的预约
			date_list    : 'GET:/v1.0/exambook/my_book/date_list', //查询我的预约日期
		}
	},

	// 座位管理
	seat: {
		// 前台学员考试预约
		info   : 'GET:/v1.0/exambook/seat/info',                 // 根据座位号选择考试科目
		lock   : 'GET:/v1.0/exambook/seat/lock',                 // 锁定座位

		// 后台
		detail : 'GET:/v1.0/exambook/seat/detail/{addressId}',   // 座位添加或更新
		save   : 'POST:/v1.0/exambook/seat/addorupdate'          // 查询考点座位信息
	},

	//卓越教师
	optimalTeacher:{
		queryIndex: 'GET:/v1.0/excellent/wx/teacher/list',          //分页查询卓越教师首页列表
		info      : 'GET:/v1.0/excellent/detail/{id}',              //根据id查询卓越教师信息
		courseList: 'GET:/v1.0/excellent/wx/teacher/course/list',   //分页查询卓越教师在线课程列表
	},
	excellent:{
		query         : 'GET:/v1.0/excellent/page',                     //卓越教师分页查询
		add           : 'POST:/v1.0/excellent/add',                     //新建卓越教师
		delete        : 'POST:/v1.0/excellent/delete',                  //卓越教师分页查询
		edit          : 'POST:/v1.0/excellent/edit',                    //编辑
		excel         : 'POST:/v1.0/excellent/excel',                   //批量导入
		level_list    : 'GET:/v1.0/subject/level/list',                 //学科列表
		myCourse_list : 'GET:/v1.0/excellent/my_course/list/{id}',      //查询已有课程列表
		course_sort   : 'POST:/v1.0/excellent/sort',                    //已有课程排序
		allCourse_list: 'GET:/v1.0/excellent/course/list/{id}',         //查询所在部门所有课程
		save_course   : 'POST:/v1.0/excellent/my_course/save',          //保存我的课程
		detail        : 'GET:/v1.0/excellent/detail/{id}',              //卓越教师信息
		obtain_page   : 'GET:/v1.0/excellent/obtain/page',              //获取管理列表
		share_list    : 'GET:/v1.0/excellent/share_course/list/{id}',   //查询共享管理课程列表
		course_save   : 'POST:/v1.0/excellent/share/course_save',       //保存共享获取
		obtain_save   : 'POST:/v1.0/excellent/obtain/save',             //保存获取
		share_page    : 'GET:/v1.0/excellent/share/page',             //保存获取
	},

	//优课汇
	excellence:{
		query         : 'GET:/v1.0/exec_collec/page',                     //卓越教师分页查询
		add           : 'POST:/v1.0/exec_collec/add',                     //新建卓越教师
		delete        : 'POST:/v1.0/exec_collec/delete',                  //卓越教师分页查询
		edit          : 'POST:/v1.0/exec_collec/edit',                    //编辑
		excel         : 'POST:/v1.0/exec_collec/excel',                   //批量导入
		myCourse_list : 'GET:/v1.0/exec_collec/has_course/list/{projectId}', //查询已有课程列表
		course_sort   : 'POST:/v1.0/exec_collec/sort',                    //已有课程排序
		allCourse_list: 'GET:/v1.0/exec_collec/course/list/{projectId}',  //查询所在部门所有课程
		save_course   : 'POST:/v1.0/exec_collec/course/save',          //保存我的课程
		detail        : 'GET:/v1.0/exec_collec/detail/{projectId}',       //查询优课汇信
		wx:{
			query:'GET:/v1.0/exec_collec/wx/list',//微信分页查询卓越教师首页列表
			info:'GET:/v1.0/exec_collec/detail/{projectId}',//根据id查询优课汇信息
			courseList:'GET:/v1.0/exec_collec/wx/course/list',//分页查询优课汇在线课程列表
		}
	},

	//培训
	train:{
		query             : 'GET:/v1.0/train/page',                       //分页查询培训
		del               : 'POST:/v1.0/train/delete',                    //删除培训
		add               : 'POST:/v1.0/train/add',                       //新增培训
		edit              : 'POST:/v1.0/train/edit',                      //编辑培训
		detail            : 'GET:/v1.0/train/detail/{trainId}',           //查询培训信息
		course_list       : 'GET:/v1.0/train/course/list/{trainId}',      //查询培训在线课程列表
		professor_list    : 'GET:/v1.0/train/professor/page',             //分页查询专家
		professor_add     : 'POST:/v1.0/train/professor/add',             //新增专家
		professor_del     : 'POST:/v1.0/train/professor/delete',          //删除专家
		professor_edit    : 'POST:/v1.0/train/professor/edit',            //编辑专家
		professor_excel   : 'POST:/v1.0/train/professor/excel',           //批量建立专家
		train_excel       : 'POST:/v1.0/train/excel',                     //批量建立培训
		apply_list        : 'GET:/v1.0/train/apply/page',                 //分页查询报名管理
		query_fields      : 'GET:/v1.0/train/apply/property/{trainId}',   //获取报名额外字段
		save_fields       : 'POST:/v1.0/train/apply/property/save',       //保存报名额外字段
		apply_export      : 'GET:/v1.0/train/apply/export',               //导出报名管理
		apply_check       : 'POST:/v1.0/train/apply/check',               //批量审核报名管理
		train_qualified   : 'POST:/v1.0/train/apply/conclude',            //项目结论批量合格不合格
		timetable         : 'GET:/v1.0/train/timetable/info/{trainId}',   //查询课程表
		timetable_save    : 'POST:/v1.0/train/timetable/save',            //查询保存
		course_save       : 'POST:/v1.0/train/course/save',               //查保存在线课程列表
		stat_page         : 'GET:/v1.0/train/stat/page',                  //在线课程统计列表
		stat_course       : 'GET:/v1.0/train/stat/course_list',           //在线课程统计列名称列表
		stat_export       : 'GET:/v1.0/train/stat/export',                //导出在线课程统计
		tpl_list          : 'GET:/v1.0/train/template/list',              //查询当前部门所有模板列表
		queryCertificate  : 'GET:/v1.0/train/certificate/page',           //分页查询证书管理
		previewCertificate: 'GET:/v1.0/train/certificate/pdf',            //通用证书管理证书Pdf证书预览
		editCertificate   : 'POST:/v1.0/train/certificate/edit',          //证书编辑
		saveCertificate   : 'POST:/v1.0/train/certificate/issue',         //批量发布证书
		importCertificate : 'POST:/v1.0/train/certificate/excel',         //批量导入证书编号
		publish           : 'POST:/v1.0/train/certificate/publish',       //全部发布证书
		task_list         : 'GET:/v1.0/train/professor/job/page',         //培训作业列表
		pay_qrcode        : 'POST:/v1.0/train/wx/payByScan',              //pc端生成二维码，扫码支付
		pay_status        : 'GET:/v1.0/train/apply/detail',               //查询报名详情中的支付状态
		wechat            : {
			query        : 'GET:/v1.0/train/wx/page',                   //微信分页查询培训
			notice_status: 'GET:/v1.0/train/wx/notice_status',          //微信我的培训红标
			intro        : 'GET:/v1.0/train/wx/introduce',              //培训简介信息
			schedule     : 'GET:/v1.0/train/wx/timetable/list',         //详情页培训课表
			professor    : 'GET:/v1.0/train/wx/professor/list',         //名师简介列表
			course       : 'GET:/v1.0/train/wx/course/list',            //培训在线课程
			my           : 'GET:/v1.0/train/wx/my_train/page',          //我的培训列表
			apply        : 'POST:/v1.0/train/wx/apply',                 //培训报名
			result_info  : 'GET:/v1.0/train/wx/apply/info/{trainId}',   //支付成功后获取信息
			// pay          : 'POST:/v1.0/train/wx/pay',                   //支付
			pay          : 'POST:/v1.0/mobile/train/wx/pay',                   //支付
		}
	},

	// 作业
	task: {
		// 作业发布
		issue: {
			query  : 'GET:/v1.0/train/job/page',      // 分页查询作业发布列表
			add    : 'POST:/v1.0/train/job/add',      // 发布作业
			del    : 'POST:/v1.0/train/job/delete',   // 批量删除发布的作业
			update : 'POST:/v1.0/train/job/edit',     // 更新发布的作业

		},

		// 作业管理
		list: {
			query : 'GET:/v1.0/train/job/student/page',   // 分页查询学员作业
			log   : 'GET:/v1.0/train/job/grade/log',      // 批改记录
			list  : 'GET:/v1.0/train/job/list',            // 项目下所有作业名称列表
			down  : 'GET:/v1.0/train/job/download'   //下载作业
		},

		// 作业批改
		correct: {
			info  : 'GET:/v1.0/train/job/info',             // 获取作业信息
			grade : 'POST:/v1.0/train/job/grade'            // 批改作业
		},

		// 学员相关、作业上交
		student: {
			query     : 'GET:/v1.0/train/job/up_list',      // 查询学员作业列表
			up        : 'POST:/v1.0/train/job/up',          // 学员上交作业
			up_delete : 'POST:/v1.0/train/job/up_delete',   // 用户删除上交作业
		}
	},
	face: {
		pageList:'GET:/v1.0/face/detect/pageList',  //分页查询人脸识别记录
		check:'POST:/v1.0/face/detect/check', 				//人脸识别人工确认
		detect:'POST:/v1.0/face/detect',  			//添加人脸识别记录
		status:'GET:/v1.0/face/detect/status', 		//查询人脸识别结果
	},

	//直播
	live: {
		log:'POST:/v1.0/live/log', 				//添加直播观看记录
		liveIndex:'GET:/live/liveIndex',		//直播页面详情
		query:'GET:/live/getLiveRoomPage', 		//获取直播列表
		add:'POST:/live/addLiveRoom', 			//新增直播间
		edit:'POST:/live/updateLiveRoom',		//修改直播间
		del:'POST:/live/deleteLiveRoom',		//删除直播间
		status:'POST:/live/updateLiveStatus',	//修改直播间状态
		tree:'GET:/live/selectLiveLeftVo', 		//直播文件树
		sign:'GET:/live/signIn/getSignInPage',	//签到列表
		end:'POST:/live/theEndOfTheBroadcast',	//结束直播
		export:'GET:/live/signIn/getSignExcel',	//直播数据导出
		url:'GET:/live/getLiveUrl',				//当前直播间地址
		getRoom:'GET:/live/getLiveRoom',        //获取直播间信息
		sigleExcel: 'GET:/live/signIn/getLiveRoomSignExcel', //获取直播间数据
		getListState: 'POST:/live/updateLiveRoomOrderState'  // 设置当前为直播间为置顶状态
	},

	//监管
	regulatory:{
		sview: 'POST:/sView/api',
		getConfig: 'GET:/superviseConfig/getConfig', //监管配置 - 获取部门监管配置
		addOrUpdate: 'POST:/superviseConfig/addOrUpdate',  //监管配置 - 监管配置添加或更新
		getActivityPage: 'POST:/activity/getActivityPage'  //监管活动 - 获取监管活动列表信息
	}
};/* </encrypt> */

// NOTE: 游客菜单
if(isGuest) {
	APIS = extend(true, APIS, GuestAPI)
}

export default APIS
