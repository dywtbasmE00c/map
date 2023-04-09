import { ElMessage, ElMessageBox } from "element-plus";


// 成功提示信息
export function succesMsg(msgInfo){
  ElMessage({
    type: 'success',
    showClose: true,
    dangerouslyUseHTMLString: true,
    message: msgInfo,
  })
}


// 警告提示信息
export function warnMsg(msgInfo){
  ElMessage({
    type: 'warning',
    showClose: true,
    dangerouslyUseHTMLString: true,
    message: msgInfo,
  })
}


// 错误提示信息
export function errorMsg(msgInfo){
  ElMessage({
    type: 'error',
    showClose: true,
    dangerouslyUseHTMLString: true,
    message: msgInfo,
  })
}
 
// 一般信息提示信息
export function infoMsg(msgInfo){
  ElMessage({
    type: 'info',
    showClose: true,
    dangerouslyUseHTMLString: true,
    message: msgInfo,
  })
}
 
// 确定一个确定按钮alertBox
export function alertBox(msg,btnName,type) {
  let confirmName = btnName == '确定'? '确定' : '是'
  return ElMessageBox.alert(msg, '提示',{
    type: type,
    confirmButtonText: confirmName,
    dangerouslyUseHTMLString: true
  });
}
 
// 确定取消;是否按钮弹出框
export function confirmBox(msg,btnName,type) {
  let confirmName = btnName == '确定'? '确定' : '是'
  let cancelsName = btnName == '确定'? '取消' : '否'
  return ElMessageBox.confirm(msg,'提示', {
    type: type,
    confirmButtonText: confirmName,
    cancelButtonText: cancelsName,
    closeOnClickModal: false,
    closeOnPressEscape: false,
    dangerouslyUseHTMLString: true
  })
}