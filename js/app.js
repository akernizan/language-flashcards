const vocabulary = [{
    category: 'days',
    className: 'dow',
    words: {
      Monday: 'Lendi',
      Tuesday: 'Madi',
      Wednesday: 'Mèkredi',
      Thursday: 'Jedi',
      Friday: 'Vandredi',
      Saturday: 'Samdi',
      Sunday: 'Dimanch',
    }
  },
  {
    category: 'food',
    className: 'food',
    words: {
      bacon: 'bekonn',
      beef: 'bèf',
      chicken: 'poul',
      goat: 'kabrit',
      ham: 'janbon',
      hamburger: 'anbègè',
      lime: 'sitwon',
      lettuce: 'leti',
      peanut: 'pistach',
      pineapple: 'zannanna',
      popcorn: 'mayi pèpèt',
      melon: 'melon',
      avocado: 'zaboka',
      fruit: 'fwi'
    }
  },
  {
    category: 'family',
    className: 'family',
    words: {
      husband: 'mari',
      wife: 'madanm',
      father: 'papa',
      mother: 'manman',
      parents: 'papa ak manman',
      child: 'timoun',
      relative: 'paran',
      brother: 'frè',
      sister: 'sè',
      uncle: 'tonton',
      aunt: 'matant',
      grandfather: 'granpapa',
      grandmother: 'grann',
      cousin_m: 'kouzen (m)',
      cousin_f: 'kouzin (f)',
      nephew: 'neve',
      niece: 'nyès'
    }
  }
];

class Categories {
  constructor(vocab) {
    this._vocab = vocab;
    this._categories = [];
  }

  renderCategories() {
    for (var cat in this._vocab) {
      if (this._vocab[cat].category) {
        this._categories.push(this._vocab[cat].category);
      }
    }
  }

  renderCategoryButtons() {
    const categoryWrapper = document.getElementById('vocabulary__category-wrapper');
    let categoryBtn;

    this.renderCategories();

    for (var i = 0; i < this._categories.length; i++) {
      categoryBtn = document.createElement('div');
      categoryBtn.classList.add('vocabulary__category', this._categories[i]);

      categoryBtn.innerHTML = this._categories[i];
      categoryWrapper.appendChild(categoryBtn);
    }
  }
}

class VocabularyCards {
  constructor(vocab, category) {
    this._vocabulary = vocab;
    this._category = category;
    this._english = [];
    this._kreyol = [];
    this._vocabText;
    this._lastK;
    this._firstK;
    this._vocabCard;
  }

  parseData() {
    for (var index in this._vocabulary) {
      if (this._vocabulary[index].category == this._category) {
        this._english = Object.keys(this._vocabulary[index].words);
        this._kreyol = Object.values(this._vocabulary[index].words);
      }
    }
    this._lastK = this._kreyol[this._kreyol.length - 1];
    this._firstK = this._kreyol[0];
  }

  makeCards() {
    let vocabCard, vocabText;
    let lastChild = vocabWrapper.childNodes.length - 1;
    this.parseData();

    prevBtn.disabled = true;

    if (vocabWrapper.classList.contains('hide')) {
      vocabWrapper.classList.remove('hide');
      vocabWrapper.classList.add('show');
    }

    for (let i = 0; i < 1; i++) {
      vocabCard = document.createElement('div');
      vocabText = document.createElement('div');

      vocabCard.classList.add('vocabulary__card');
      vocabText.classList.add('vocabulary__text');

      vocabText.innerHTML = this._kreyol[i];

      vocabCard.appendChild(vocabText);
      vocabWrapper.appendChild(vocabCard);
    }
    this._vocabText = document.getElementsByClassName('vocabulary__text')[0];
    this._vocabCard = document.getElementsByClassName('vocabulary__card')[0];
  }

  showTranslation(counter) {
    if (this._vocabText.classList.contains('english')) {
      this._vocabText.innerHTML = this._kreyol[counter];
      this._vocabText.classList.remove('english');
    } else {
      this._vocabText.innerHTML = this._english[counter];
      this._vocabText.classList.add('english');
    }
  }

  nextCard(counter) {
    this._vocabText.innerHTML = this._kreyol[counter];
    prevBtn.disabled = false;

    if (this._kreyol[counter] === this._lastK) {
      nextBtn.setAttribute('disabled', 'disabled');
    }
  }

  prevCard(counter) {
    this._vocabText.innerHTML = this._kreyol[counter];
    nextBtn.disabled = false;

    if (this._kreyol[counter] === this._firstK) {
      prevBtn.setAttribute('disabled', 'disabled');
    }
  }

  backToMenu() {
    vocabWrapper.classList.remove('show');
    vocabWrapper.classList.add('hide');

    categoryWrapper.classList.add('show');
    categoryWrapper.classList.remove('hide');

    exitBtn.classList.add('hide');
    exitBtn.classList.remove('show');

    this._vocabCard.remove();
  }
}

/*render card category on click */
const categoryWrapper = document.getElementById('vocabulary__category-wrapper');
const vocabWrapper = document.getElementById('vocabulary__wrapper');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const exitBtn = document.getElementById('exit');
const body = document.getElementsByTagName('body')[0];
let card;
let counter = 0;

let cat = new Categories(vocabulary);
cat.renderCategoryButtons();

categoryWrapper.classList.add('show');
nextBtn.classList.add('hide');
prevBtn.classList.add('hide');
exitBtn.classList.add('hide');

document.addEventListener('click', function(e) {
  let target = e.target;
  if (categoryWrapper.classList.contains('show') && target.classList.contains('vocabulary__category')) {
    if (target.classList.contains('days')) {
      categoryWrapper.classList.add('hide');
      categoryWrapper.classList.remove('show');
      body.classList.add('days');

      vocabWrapper.classList.add('show');
      card = new VocabularyCards(vocabulary, 'days');
      card.makeCards();
    } else if (target.classList.contains('food')) {
      categoryWrapper.classList.add('hide');
      categoryWrapper.classList.remove('show');
      body.classList.add('food');

      vocabWrapper.classList.add('show');
      card = new VocabularyCards(vocabulary, 'food');
      card.makeCards();
    } else {
      categoryWrapper.classList.add('hide');
      categoryWrapper.classList.remove('show');
      body.classList.add('family');

      vocabWrapper.classList.add('show');
      card = new VocabularyCards(vocabulary, 'family');
      card.makeCards();
    }

    nextBtn.classList.remove('hide');
    prevBtn.classList.remove('hide');
    exitBtn.classList.remove('hide');

    nextBtn.classList.add('show');
    prevBtn.classList.add('show');
    exitBtn.classList.add('show');

  }

  if (target.classList.contains('vocabulary__card') || target.classList.contains('vocabulary__text')) {
    card.showTranslation(counter);
  }

  if (target.id && target.id === 'next') {
    ++counter;
    card.nextCard(counter);
  }
  if (target.id && target.id === 'prev') {
    --counter;
    card.prevCard(counter);
  }
  if (target.id && target.id === 'exit') {
    card.backToMenu();
  }
}, false);
