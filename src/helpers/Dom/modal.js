
export const showModal = (id)=>{
    const modal = document.getElementById(id);
    modal.classList.remove('invisible');
}

export const closeModal = (id)=>{
    const modal = document.getElementById(id);
    modal.classList.add('invisible');
}