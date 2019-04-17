module.exports = {
	"env": {
		"browser": true,
		"es6": true
	},
	"extends": "eslint:recommended",
	"parserOptions": {
		"ecmaVersion": 2015,
		"sourceType": "module"
	},
	"rules": {
		"no-extra-boolean-cast": 1,               //多余的感叹号转布尔型
		"no-extra-semi": 1,                       //多余的分号
		"no-extra-parens": 1,                     //多余的括号
		"no-empty": 1,                            //空代码块
		"no-use-before-define": [1, "nofunc"],    //使用前未定义
		"complexity": [1, 20],                    //圈复杂度大于10 警告

		//常见错误
		"comma-dangle": [2, "never"],             //定义数组或对象最后多余的逗号
		"no-debugger": 2,                         //debugger 调试代码未删除
		"no-constant-condition": 2,               //常量作为条件
		"no-dupe-args": 2,                        //参数重复
		"no-dupe-keys": 2,                        //对象属性重复
		"no-duplicate-case": 2,                   //case重复
		"no-empty-character-class": 2,            //正则无法匹配任何值
		"no-invalid-regexp": 2,                   //无效的正则
		"no-func-assign": 2,                      //函数被赋值
		"valid-typeof": 2,                        //无效的类型判断
		"no-unreachable": 2,                      //不可能执行到的代码
		"no-unexpected-multiline": 2,             //行尾缺少分号可能导致一些意外情况
		"no-sparse-arrays": 2,                    //数组中多出逗号
		"no-shadow-restricted-names": 2,          //关键词与命名冲突
		"no-undef": 2,                            //变量未定义
		"no-unused-vars": 2,                      //变量定义后未使用
		"no-cond-assign": 2,                      //条件语句中禁止赋值操作
		"no-native-reassign": 2,                  //禁止覆盖原生对象
		"use-isnan": 2,								//禁止比较时使用NaN，只能用isNaN()
		"strict": 2,							  //使用严格模式
		"vars-on-top": 2,							//var必须放在作用域顶部
		"no-delete-var": 2,							//不能对var声明的变量使用delete操作符
		//代码风格优化
		"no-else-return": 1,                      //在else代码块中return，else是多余的
		"no-multi-spaces": 1,                     //不允许多个空格
		"key-spacing": [1, {"beforeColon": false, "afterColon": true}],//object直接量建议写法 : 后一个空格签名不留空格
		"block-scoped-var": 2,                    //变量定义后未使用
		"consistent-return": 2,                   //函数返回值可能是不同类型
		"accessor-pairs": 2,                      //object getter/setter方法需要成对出现
		"dot-location": [2, "property"],          //换行调用对象方法  点操作符应写在行首
		"no-lone-blocks": 2,                      //多余的{}嵌套
		"no-empty-label": 2,                      //无用的标记
		"no-extend-native": 2,                    //禁止扩展原生对象
		"no-floating-decimal": 2,                 //浮点型需要写全 禁止.1 或 2.写法
		"no-loop-func": 2,                        //禁止在循环体中定义函数
		"no-new-func": 2,                         //禁止new Function(...) 写法
		"no-self-compare": 2,                     //不允与自己比较作为条件
		"no-sequences": 2,                        //禁止可能导致结果不明确的逗号操作符
		"no-throw-literal": 2,                    //禁止抛出一个直接量 应是Error对象
		"no-return-assign": [2, "always"],        //不允return时有赋值操作
		"no-redeclare": [2, {"builtinGlobals": true}],//不允许重复声明
		"no-unused-expressions": [2, {"allowShortCircuit": true, "allowTernary": true}],//未使用的表达式
		"no-useless-call": 2,                     //无意义的函数call或apply
		"no-useless-concat": 2,                   //无意义的string concat
		"no-void": 2,                             //禁用void
		"no-with": 2,                             //禁用with
		"no-warning-comments": [2, { "terms": ["todo", "fixme", "any other term"], "location": "anywhere" }],//标记未写注释
		"curly": 2,                                //if、else、while、for代码块用{}包围
		"indent":[0 , 4],                                  //检验缩进
		"no-console": 1,                            //condole.log 警告
		"semi": [0, "always"]                    //行位分号  js 感觉建议不强制校验
	}
};