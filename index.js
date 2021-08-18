let myLeads = []

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const clearBtn = document.getElementById("clear-btn")
const tabBtn = document.getElementById("tab-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage
  render(myLeads)
}

function clearLeads(){
  localStorage.value="" // clear local storage
  myLeads.value="" // clear saved tabs
}

function render(leads) { // for the sake of reusability at every rendering process
  let listItems = ""
    for (i=0; i<leads.length; i++){
      // listItems  += "<li><a target='_blank' href='"+ myLeads[i] +"'>" + myLeads[i] +"</a> </li>"
      listItems  += `
      <li>
        <a target='_blank' href='${leads[i]}'>
          ${leads[i]}
        </a>
      </li>
      `
    }
    ulEl.innerHTML = listItems
}

tabBtn.addEventListener("click", function(){
  chrome.tabs.query({active: true,  currentWindow: true}, function(tabs){ // catch the current tab query
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
  })
})
inputBtn.addEventListener("click", function(){
  myLeads.push(inputEl.value)
  inputEl.value =""
  localStorage.setItem("myLeads", JSON.stringify(myLeads))
  render(myLeads)
})

clearBtn.addEventListener("dblclick", function(){
  localStorage.clear() // clear the local storage
  myLeads = [] // clear myLeads array
  render(myLeads) // clear the DOM
})


