var tarefas = []


function addTarefa() {
    const input = document.getElementById("tarefa-text");
    const tarefaTexto = input.value.trim();

    if (tarefaTexto === "") {
        Swal.fire({
            title: "ERROR",
            text: "VOCÊ TENTOU ADICIONA UMA TAREFA SEM TEXTO!",
            icon: "error"
        });
        return;
    }
    const novaTarefa = {
        id: Math.floor(Math.random() * 10000000),
        text: tarefaTexto,
        completed: false
    }
    tarefas.push(novaTarefa);
    input.value = "";
    input.focus();
    render();
    localStorage.setItem("tarefas", JSON.stringify(tarefas));

}
function render() {
    console.log(tarefas)
    const listaTarefas = document.getElementById("lista-tarefa")
    listaTarefas.innerHTML = ""
    tarefas.forEach(tarefa => {
        const li = document.createElement("li");
        if (tarefa.completed === true) {
            li.classList.add("completed")
        }
        const span = document.createElement("span");
        span.textContent = tarefa.text;

        const concluir = document.createElement("span");
        concluir.textContent = "task_list"
        concluir.classList.add("check")
        concluir.classList.add("material-symbols-outlined")
        concluir.setAttribute("onclick", `tootle(${tarefa.id});`)
        

        const Editar = document.createElement("Button");
        Editar.textContent = "Editar"
        Editar.classList.add("edit")
        Editar.setAttribute("onclick", `Edit(${tarefa.id});`)

        const delet = document.createElement("Button");
        delet.textContent = "Deletar"
        delet.classList.add("delete");
        delet.setAttribute("onclick", `Delete(${tarefa.id});`)

        const div = document.createElement("div")
        div.appendChild(concluir)
        div.appendChild(Editar)
        div.appendChild(delet)

        li.appendChild(span);
        li.appendChild(div);

        listaTarefas.appendChild(li);

    })

}
function tootle(id) {
    const index = tarefas.findIndex(tarefa => tarefa.id === id);
    const valorAtual = tarefas[index].completed;
    tarefas[index].completed = !valorAtual;
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
    render();
}

function Edit(id) {
    const index = tarefas.findIndex(tarefa => tarefa.id === id);
    Swal.fire({
        title: "Informe a nova tarega",
        input: "text",
        showCancelButton: true,
        inputValue: tarefas[index].text,
        confirmButtonText: "Salvar",
        showLoaderOnConfirm: true,
        preConfirm: async (text) => {
            if (text.trim() === "" || text === null) {
                Swal.fire({
                    title: "ERROR",
                    text: "Informe um valor para atualizar!",
                    icon: "error"
                });
                return false;
            } else {
                tarefas[index].text = text.trim();
            }

        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Sucesso",
                text: "Salvo!",
                icon: "success"
            });
            localStorage.setItem("tarefas", JSON.stringify(tarefas));
            render();
        }

    });

}

function Delete(id) {
    // const index = tarefas.findIndex(tarefa => tarefa.id === id);
    // tarefas.splice(index, 1);    
    tarefas = tarefas.filter(tarefa => tarefa.id !== id)
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
    render();
}

function addToEnter(evento) {
    if (evento.key === 'Enter') {
        addTarefa();
    }
}


function Onload() {    
    const tarefaStorage = localStorage.getItem("tarefas");
    if (tarefaStorage) {
        tarefas = JSON.parse(tarefaStorage);
        console.log("Tarefas recuperadas: ");
        render();
    }
}