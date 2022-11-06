const btnModify =document.querySelector('#btn1')
const btnDelete=document.querySelector('#btn2')
const record =document.querySelector('#id').textContent


btnModify.addEventListener("click", (e) => {alert('modify '+record)})
btnModify.addEventListener("click", (e) => {myInstance.deleteById(record)})

