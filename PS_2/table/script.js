const GOODS = [{
    category: 'furniture',
    name: 'Chair',
    amount: 1,
    price: 20
  },
  {
    category: 'supplies',
    name: 'Gel Pen',
    amount: 20,
    price: 2
  },
  {
    category: 'other',
    name: 'Trash Bin',
    amount: 1,
    price: 5
  },
  {
    category: 'furniture',
    name: 'Sofa',
    amount: 1,
    price: 50
  },
  {
    category: 'supplies',
    name: 'Notebook',
    amount: 3,
    price: 3
  },
  {
    category: 'other',
    name: 'Calendar 2019',
    amount: 1,
    price: 3
  }
];

const CURRENCY = '$';
const filter = document.getElementById("filter");
const searchByName = document.getElementById("search");

let GoogsFilter;
let GoogsFilterAll;

const drawFilterTable = () => {
  filterCategory();
  filterName();
  drawTable();
}
const filterCategory = () => {
  if (filter.value) {
    GoogsFilter = GOODS.filter(obj => obj.category == filter.value);
  } else {
    GoogsFilter = GOODS;
  }
};

const filterName = () => {
  if (searchByName.value) {
    let find = searchByName.value.toLowerCase();
    GoogsFilterAll = GoogsFilter.filter(obj => obj.name.toLowerCase().includes(find));
  } else {
    GoogsFilterAll = GoogsFilter;
  }
};

filter.addEventListener("change", () => {
  drawFilterTable();
});
searchByName.addEventListener("keyup", () => {
  drawFilterTable();
});


let sortCat = false;
let sortName = false;


const sort = (id, prop, sorting) => {
  let headSort = document.getElementById(id);
  headSort.addEventListener("click", () => {
    GoogsFilterAll = GoogsFilterAll.sort(function (a, b) {
      let categoryA = a[prop].toLowerCase(),
        categoryB = b[prop].toLowerCase();
      if (categoryA < categoryB)
        return -1;
      if (categoryA > categoryB)
        return 1;
      return 0;
    });
    if (!sorting) {
      sorting = true;
    } else {
      GoogsFilterAll = GoogsFilterAll.reverse();
      sorting = false;
    }
    drawArrow(headSort, sorting);
    drawFilterTable();
  });
};

sort('categorySort', 'category', sortCat);
sort('nameSort', 'name', sortName);


const drawArrow = (id, sorting) => {
  document.getElementById("arrowCat").innerHTML = "";
  document.getElementById("arrowName").innerHTML = "";
  id.lastChild.innerHTML = sorting ? '▼' : '▲';
}

let propObj = [];
for (let prop in GOODS[0]) {
  propObj.push(prop);
}


drawFilterTable();


function drawTable() {
  let tableBody = '';
  let totalPrice = 0;

  for (let i = 0; i < GoogsFilterAll.length; i++) {
    tableBody += newRow(i);
    totalPrice += GoogsFilterAll[i].price * GoogsFilterAll[i].amount;
  }

  document.getElementById("table").innerHTML = tableBody;
  document.getElementById("total").innerHTML = totalPrice + CURRENCY;
}

function newRow(index) {
  let row = '<tr>';
  propObj.forEach((element) => {
    let dop = element == 'price' ? CURRENCY : '';
    row += `<td> ${GoogsFilterAll[index][element]}${dop} </td>`;
  });
  row += '</tr>';
  return row;
}