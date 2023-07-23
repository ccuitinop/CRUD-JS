class Usuario {
    constructor(name, email, phone){
        this.name = name;
        this.email = email;
        this.phone = phone;
    }
}

function showData() {
    let usersList;
    if (localStorage.getItem("usersList") === null) {
        usersList = []
    } else {
        usersList = JSON.parse(localStorage.getItem("usersList"))
    }
    let html = "";
    usersList.forEach((user, index) => {
        html += `
        <tr class="fila">
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.phone}</td>
                    <td class= "text-center"><button class=" me-3 btn btn-danger" onclick="deleteData(${index})">Eliminar</button><button class="btn btn-warning" onclick="editData(${index})">Editar</button></td>
                  </tr>
        `
    });
    document.querySelector('tbody').innerHTML = html;
}

document.onload = showData()

function addData(event) {
    event.preventDefault();
    let name = document.querySelector('#name').value;
    let email = document.querySelector('#email').value;
    let phone = document.querySelector('#phone').value;

    if (name === "" || email === "") return;

    const usuario = new Usuario(name, email, phone); 
    console.log(usuario)
    let usersList;
    if (localStorage.getItem("usersList") === null) {
        usersList = []
    } else {
        usersList = JSON.parse(localStorage.getItem("usersList"))
    }
    usersList.push(usuario)
    localStorage.setItem("usersList", JSON.stringify(usersList))
    showData()

    document.querySelector('#name').value = ""
    document.querySelector('#email').value = ""
    document.querySelector('#phone').value = ""
}

function editData(index) {
    document.getElementById('add-btn').style.display = 'none';
    document.getElementById('edit-btn').style.display = 'block';

    let usersList;
    if (localStorage.getItem("usersList") === null) {
        usersList = []
    } else {
        usersList = JSON.parse(localStorage.getItem("usersList"))
    }
    document.querySelector('#name').value = usersList[index].name;
    document.querySelector('#email').value = usersList[index].email;
    document.querySelector('#phone').value = usersList[index].phone;

    document.getElementById('edit-btn').onclick = function () {
        usersList[index].name = document.querySelector('#name').value
        usersList[index].email = document.querySelector('#email').value
        usersList[index].phone = document.querySelector('#phone').value

        localStorage.setItem("usersList", JSON.stringify(usersList));
        showData();
        document.querySelector('#name').value = ""
        document.querySelector('#email').value = ""
        document.querySelector('#phone').value = ""

        document.getElementById('add-btn').style.display = 'block';
        document.getElementById('edit-btn').style.display = 'none';
    }
}

function deleteData(index){

    let usersList;

    if (localStorage.getItem('usersList') == null) {
        usersList = [];

    }else{
        usersList = JSON.parse(localStorage.getItem('usersList'));
    }

    usersList.splice(index, 1);
    localStorage.setItem('usersList', JSON.stringify(usersList));
    
    let node = document.querySelector(".fila");
    node.parentNode.removeChild(node);
}

showData();
