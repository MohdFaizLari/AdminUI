//----------------------This function is used for creating a bottom section of the table----------------------->
let rowsData = [];

let selectedRowIds = [];

let errorMessage = document.createElement("div");
errorMessage.setAttribute("id", "errorMessage");

let addSection = () => {
  if (rowsData.length > 0) {
    //<---------------This condition will check the rowsData length and it will work accordingly----------->

    let section = document.createElement("section"); //-----------> Creating section ele here.
    section.setAttribute("id", "bottomSection");
    section.style.display = "flex";
    section.style.alignItems = "center";
    section.style.width = "100%";
    section.style.height = "50px";
    section.style.gap = "50px";

    //----------------Adding delete selected button here-------------->

    let deleteSelectedButton = document.createElement("button");
    deleteSelectedButton.classList.add("buttonPadding");
    deleteSelectedButton.style.marginLeft = "10px";
    deleteSelectedButton.style.border = "1px solid black";
    deleteSelectedButton.style.borderRadius = "50px 50px 50px 50px";
    deleteSelectedButton.style.backgroundColor = "D3D3D3";
    deleteSelectedButton.innerText = "Delete Selected";
    deleteSelectedButton.addEventListener("click", deleteSelected);
    deleteSelectedButton.setAttribute("type", "Button");
    deleteSelectedButton.setAttribute("id", "deleteSelected");
    deleteSelectedButton.setAttribute("disabled", true);
    section.appendChild(deleteSelectedButton);

    //--------------Adding page numbers here by the help of loop--------------->

    let n = Math.ceil(rowsData.length / 10); //----------> Using math.ceil() method to store the value.

    for (let i = 0; i < n; i++) {
      let pageButtons = document.createElement("button");
      pageButtons.classList.add("buttonPadding");
      pageButtons.style.borderRadius = "100%";
      pageButtons.style.border = "1px solid black";
      pageButtons.style.backgroundColor = "D3D3D3";
      pageButtons.innerText = i + 1;
      section.appendChild(pageButtons);
    }

    let tableBody = document.getElementById("tableBody");
    tableBody.appendChild(section); //----------> Inserting section part here in the table body.
  }
};

let deleteTableRow = (e) => {
  let rowId = e.target.id;
  let rowEle = document.getElementById(`row-${rowId}`);
  rowEle.parentNode.removeChild(rowEle); //--------> removing row ele here.
  console.log(e);
};

let checkBoxSelection = (e) => {
  console.log(e);
  let rowId = e.target.id;
  if (e.target.checked === true) {
    selectedRowIds.push(rowId);
  } else if (e.target.checked === false) {
    let index = null;
    for (let i = 0; i < selectedRowIds.length; i++) {
      if (rowId === selectedRowIds[i]) {
        index = i;
      }
    }
    selectedRowIds.splice(index, 1);
  }

  let deleteSelected = document.getElementById("deleteSelected");

  if (selectedRowIds.length) {
    deleteSelected.disabled = false;
  } else {
    deleteSelected.disabled = true;
  }
  console.log(selectedRowIds);
};

function deleteSelected(e) {
  console.log(e);
  for (let i = 0; i < selectedRowIds.length; i++) {
    let rowId = selectedRowIds[i];
    let rowEle = document.getElementById(`row-${rowId}`);
    rowEle.parentNode.removeChild(rowEle);
  }
  selectedRowIds = [];
}

function allTableRowsSelection() {
  let checkBoxList = document.getElementsByClassName("tableRowCheckbox");
  let selectAllEle = document.getElementById("selectAllTableRows");
  console.log(checkBoxList);

  let deleteSelected = document.getElementById("deleteSelected");

  if (selectAllEle.checked === true) {
    for (let i = 0; i < checkBoxList.length; i++) {
      checkBoxList[i].checked = true;
      deleteSelected.disabled = false;
    }
    for (let i = 0; i < rowsData.length; i++) {
      let rowData = rowsData[i];
      let rowId = rowData.id;
      selectedRowIds.push(rowId);
    }
    deleteSelected.disabled = false;
  } else if (selectAllEle.checked === false) {
    for (let i = 0; i < checkBoxList.length; i++) {
      checkBoxList[i].checked = false;
    }
    selectedRowIds = [];
    deleteSelected.disabled = true;
  }
}

//-------------------------------------------Creating main Func------------------------------------------------>

let createTable = (rowsData) => {
  //------------This is an arrow function.
  console.log("create table");
  if (!rowsData.length) {
    /* ----> This condition is checking whether the input file contains some data or it's blank only
    according to that the code will work --------> */

    let noDataDiv = document.createElement("div");
    noDataDiv.style.width = "100%";
    noDataDiv.style.height = "100%";
    noDataDiv.innerText = "No data to show! 😑";
    noDataDiv.style.textAlign = "center";
    noDataDiv.style.fontWeight = "bolder";
    noDataDiv.style.marginTop = "20%";
    let tableBody = document.getElementById("tableBody"); //---------------> Selecting tablebody location.
    tableBody.appendChild(noDataDiv); //----------> Inserting the innertext in table Body.
    return;
    //---- If rowsData length is 0 it will print No data to show!
  }

  //-------------------------This loop is running to create new rows inside the HTML page---------------------->

  for (let i = 0; i < rowsData.length; i++) {
    let rowData = rowsData[i]; //----------------> Storing rows data one by one in rowData variable here.

    let rowId = rowData.id;

    let tableRow = document.createElement("div"); // ---> To create new div ele.
    tableRow.classList.add("tableRows"); //----> To add existing class of CSS in the element.
    tableRow.setAttribute("id", `row-${rowId}`);

    // <-------------------Method-2-------------------------------->
    // element.setAttribute() -------> To set attributes.
    // setAttribute('class', 'fixedWidth'); -------------> Syntax
    //---------------------------------------------------------------||

    //------------------------------Checkbox cell starts here--------------------------->

    let checkBoxCell = document.createElement("div"); //-----------> Creating div inside the new created row.
    checkBoxCell.classList.add("tableRowCells");
    checkBoxCell.classList.add("marginRightLeft"); //----------> Added for margin.
    let inputEle = document.createElement("input");
    inputEle.style.width = "15px";
    inputEle.style.height = "15px";
    inputEle.setAttribute("type", "checkbox");
    inputEle.classList.add("tableRowCheckbox");
    inputEle.setAttribute("id", rowId);
    inputEle.addEventListener("click", checkBoxSelection);
    checkBoxCell.appendChild(inputEle);
    tableRow.appendChild(checkBoxCell);

    //-----------------------------Checkbox cell ends here <---------------------------||

    //------------------------------Name cell starts here------------------------------->

    let nameCell = document.createElement("div");
    let name = rowData.name; //------------------> Copying key values here from the input file.
    let nameSpan = document.createElement("span"); //---------------> Creating new ele here.
    nameSpan.innerText = name;
    nameCell.classList.add("tableRowCells");
    nameCell.appendChild(nameSpan);
    tableRow.appendChild(nameCell);

    //-----------------------------Name cell ends here <---------------------------||

    //------------------------------Email cell starts here------------------------------->

    let emailCell = document.createElement("div");
    let email = rowData.email;
    let emailSpan = document.createElement("span");
    emailSpan.innerText = email;
    emailCell.classList.add("tableRowCells");
    emailCell.appendChild(emailSpan);
    tableRow.appendChild(emailCell);

    //-----------------------------Email cell ends here <---------------------------||

    //------------------------------Role cell starts here------------------------------->

    let roleCell = document.createElement("div");
    let role = rowData.role;
    let roleSpan = document.createElement("span");
    roleSpan.innerText = role;
    roleCell.classList.add("tableRowCells");
    roleCell.appendChild(roleSpan);
    tableRow.appendChild(roleCell);

    //-----------------------------Role cell ends here <---------------------------||

    //--------------------------Action cell starts here----------------------------------->

    let actionCell = document.createElement("div");
    actionCell.style.display = "flex";
    actionCell.style.alignItems = "center";
    actionCell.style.gap = "10px";

    //-----------------Edit button------------------------>

    let editButton = document.createElement("button");
    // editButton.onclick = ;
    editButton.classList.add("buttonPadding");
    editButton.style.border = "1px solid black";
    editButton.style.borderRadius = "5px";
    editButton.style.backgroundColor = "white";
    editButton.innerText = "Edit";
    editButton.setAttribute("type", "Button");
    actionCell.appendChild(editButton);

    //---------------Delete button------------------------->

    let deleteButton = document.createElement("button");

    deleteButton.classList.add("buttonPadding");
    deleteButton.classList.add("deleteButtons");
    deleteButton.style.border = "white";
    deleteButton.style.borderRadius = "5px";
    deleteButton.style.backgroundColor = "D3D3D3";
    deleteButton.setAttribute("id", rowId);
    deleteButton.addEventListener("click", deleteTableRow);
    deleteButton.setAttribute("type", "Button");
    // deleteButton.setAttribute("disabled", true);
    deleteButton.innerText = "Delete";
    actionCell.appendChild(deleteButton);

    actionCell.classList.add("tableRowCells");
    tableRow.appendChild(actionCell); //--------------> Inserting action cell here.

    //---------------------------Action cell ends here <------------------------------||

    let tableBody = document.getElementById("tableBody");
    tableBody.appendChild(tableRow);
  }
  addSection();
};

//---------------------------------API Call ----------------------->

async function inputData() {
  const res = await fetch(
    // By the help of await create table will not call until the input data is fetched.
    "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json",
    {
      method: "GET",
    }
  );

  rowsData = await res.json();
  createTable(rowsData);
  // console.log(rowsData);
}
inputData();

//-----------------------------------Table re-render Function----------------->

// By the help of this function we will create the row according to user input in search bar.

function reRenderTable(sortedRowData) {
  for (let i = 0; i < rowsData.length; i++) {
    let tableRows = rowsData[i];
    let tableRowsId = tableRows.id;
    tableRows = document.getElementById(`row-${tableRowsId}`);
    if (tableRows) {
      tableRows.parentNode.removeChild(tableRows);
    }
  }
  let bottomSection = document.getElementById("bottomSection");
  bottomSection.parentNode.removeChild(bottomSection);
  createTable(sortedRowData);
}

//--------------------------------Search Bar Function---------------->

// By the help of this function we will store the user input from search bar and then we will search
// that data in our data base(Input JSON).

function searchBarFunc() {
  let inputFieldData = document.getElementById("searchBox");
  let inputFieldValue = inputFieldData.value;

  let rowDataValue = [];
  let modinputFieldValue = inputFieldValue.toUpperCase();
  console.log(modinputFieldValue);

  for (let i = 0; i < rowsData.length; i++) {
    let rowData = rowsData[i];
    let rowDataName = rowData.name.toUpperCase();
    let rowDataEmail = rowData.email.toUpperCase();
    let rowDataRole = rowData.role.toUpperCase();
    if (modinputFieldValue === rowDataName) {
      rowDataValue.push(rowData);
      // console.log(rowDataValue);
    } else if (modinputFieldValue === rowDataEmail) {
      rowDataValue.push(rowData);
      // console.log(rowDataValue);
    } else if (modinputFieldValue === rowDataEmail) {
      rowDataValue.push(rowData);
      // console.log(rowDataValue);
    }
  }

  console.log(rowDataValue);

  if (rowDataValue.length > 0) {
    reRenderTable(rowDataValue);
  } else if (!rowDataValue.length) {
    if (inputFieldValue) {
      for (let i = 0; i < rowsData.length; i++) {
        let tableRows = rowsData[i];
        let tableRowsId = tableRows.id;
        tableRows = document.getElementById(`row-${tableRowsId}`);
        if (tableRows) {
          tableRows.parentNode.removeChild(tableRows);
        }
      }
      let bottomSection = document.getElementById("bottomSection");
      bottomSection.parentNode.removeChild(bottomSection);
      errorMessage.style.width = "100%";
      errorMessage.style.height = "100%";
      errorMessage.innerText = "No matching data to show!";
      errorMessage.style.textAlign = "center";
      errorMessage.style.fontWeight = "bolder";
      errorMessage.style.marginTop = "20%";
      let tableBody = document.getElementById("tableBody"); //---------------> Selecting tablebody location.
      tableBody.appendChild(errorMessage);
    } else if (!inputFieldValue) {
      // By the help of this condition we will check if the input field is empty in the search bar
      // so we will re-print the original data.
      // window.location.reload(true); // To reload the web page forcefully.
      // createTable(rowsData);
      let errorCode = document.getElementById("errorMessage");
      if (errorCode) {
        errorCode.parentNode.removeChild(errorCode);
        createTable(rowsData);
      } else if (!errorCode) {
        reRenderTable(rowsData);
      }

      // addSection();
    }
  }
}
