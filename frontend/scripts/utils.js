export let pageIndex = 0;
export let itemsPerPage = 10;

export function renderPagination(moviesArray, func) {
  let pageContainerElement = document.querySelector("#pageContainer");
  while (pageContainerElement.firstChild) {
    pageContainerElement.removeChild(pageContainerElement.firstChild);
  }

  for (let i = 0; i < Math.ceil(moviesArray.length / itemsPerPage); i++) {
    let pageBtn = document.createElement("button");
    pageBtn.className = "pageBox";
    pageBtn.innerText = i + 1;
    pageBtn.addEventListener("click", (e) => {
      pageIndex = Number(e.target.innerText) - 1;
      func(moviesArray);
      // console.log(pageIndex);
    });
    pageContainerElement.append(pageBtn);
  }
}
