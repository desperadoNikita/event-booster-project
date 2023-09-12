import { countryCode } from './search-form-handler';
import { keyword } from './search-form-handler';
import { displayGallery } from './displayGallery';

const paginationIteam = document.querySelector('.pagination');

paginationIteam.addEventListener('click', onpaginationIteamHdlr);

function onpaginationIteamHdlr(e) {
  const page = Number(e.target.dataset.page) - 1;
  displayGallery({ countryCode, keyword, page });
}

export function paginationMarkap(totalPages, pageNumber) {
  let pageArrResp = [];
  let pageArr = [];
  for (let index = 1; index <= totalPages; index += 1) {
    pageArrResp.push(index);
  }

  if (pageArrResp.length > 30) {
    pageArr = pageArrResp.slice(0, 30);
  } else pageArr = pageArrResp;

  if (pageArr.length <= 7) {
    const markap1 = pageArr.reduce(
      (acc, number, index, arr) =>
        (acc += `<li class="pagination-item" data-page=${number}>${number}</li>`),
      ``
    );
    return markap1;
  }

  if ((pageArr.length > 7) & (pageNumber < 5)) {
    const markap1 = pageArr.reduce((acc, number, index, arr) => {
      if (index < 5 || arr.length <= 7) {
        acc += `<li class="pagination-item" data-page=${number}>${number}</li>`;
      }
      return acc;
    }, ``);
    const markap2 = pageArr.reduce((acc, number, index, arr) => {
      if ((arr.length > 6) & (index >= 5) & (index <= arr.length - 1)) {
        return `<li class="pagination-item" data-page=${number}>...</li>`;
      }
    });
    const markap3 = pageArr.reduce((acc, number, index, arr) => {
      if ((arr.length > 5) & (index === arr.length - 1)) {
        return `<li class="pagination-item" data-page=${number}>${number}</li>`;
      }
    });
    return markap1 + markap2 + markap3;
  }

  if ((pageArr.length > 7) & (pageNumber >= 5)) {
    const markap1 = pageArr.reduce((acc, number, index, arr) => {
      if (index === 1) {
        acc += `<li class="pagination-item" data-page=${index}>${index}</li>`;
      }
      return acc;
    }, ``);
    const markap2 = pageArr.reduce((acc, number, index, arr) => {
      if ((index > 1) & (index < pageNumber - 1)) {
        return `<li class="pagination-item" data-page=${index}>...</li>`;
      }
      return acc;
    }, ``);
    const markap3 = pageArr.reduce((acc, number, index, arr) => {
      if (
        (index >= pageNumber - 1) &
        (index <= pageNumber + 1) &
        (pageNumber < arr.length - 5)
      ) {
        acc += `<li class="pagination-item" data-page=${index}>${index}</li>`;
      }
      return acc;
    }, ``);
    const markap4 = pageArr.reduce((acc, number, index, arr) => {
      if (
        (index >= pageNumber + 1) &
        (index <= arr.length - 5) &
        (pageNumber < arr.length - 4)
      ) {
        return `<li class="pagination-item" data-page=${index}>...</li>`;
      }
      return acc;
    }, ``);

    const markap5 = pageArr.reduce((acc, number, index, arr) => {
      if (
        (index >= arr.length - 5) &
        (index <= arr.length - 2) &
        (pageNumber > arr.length - 6)
      ) {
        acc += `<li class="pagination-item" data-page=${number}>${number}</li>`;
      }
      return acc;
    }, ``);
    const markap6 = pageArr.reduce((acc, number, index, arr) => {
      if (index === arr.length - 1) {
        return `<li class="pagination-item" data-page=${number}>${number}</li>`;
      }
      return acc;
    }, ``);

    return markap1 + markap2 + markap3 + markap4 + markap5 + markap6;
  }
}
