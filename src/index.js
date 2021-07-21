import ImgApiService from './js/apiService';
import LoadMoreBtn from './js/load-more-btn';
import imgCardTpl from './templates/imgCards.hbs';


const refs = {
    searchForm: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    loadingBtn: document.querySelector('[data-action="load-more"]'),
}

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const imageApiService = new ImgApiService();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchImages);

function onSearch(e) {
  e.preventDefault();

  imageApiService.query = e.currentTarget.elements.query.value;

  if (imageApiService.query === '') {
    return 
  }

  loadMoreBtn.show();
  imageApiService.resetPage();
  clearImagesContainer();
    fetchImages(); 
}

function fetchImages() {
  loadMoreBtn.disable();
  imageApiService.fetchGallery().then(images => {
      appendImagesMarkup(images);
      loadMoreBtn.enable();
      scrollContent();
  });
}

function appendImagesMarkup(images) {
  refs.gallery.insertAdjacentHTML('beforeend', imgCardTpl(images));
}

function clearImagesContainer() {
  refs.gallery.innerHTML = '';
}

function scrollContent () {
    refs.loadingBtn.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
    });
}