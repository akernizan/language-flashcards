const vocabulary = [{
    category: 'days',
    className: 'dow',
    words: {
      Monday: 'Lendi',
      Tuesday: 'Madi',
      Wednesday: 'Mekredi',
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
      beef: 'bef',
      chicken: 'poul',
      goat: 'kabrit',
      ham: 'janbon',
      hamburger: 'anbege',
      lime: 'sitwon',
      lettuce: 'leti',
      peanut: 'pistach',
      pineapple: 'zannanna',
      popcorn: 'mayi pepet',
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
      brother: 'fre',
      sister: 'se',
      uncle: 'tonton',
      aunt: 'matant',
      grandfather: 'granpapa',
      grandmother: 'grann',
      cousin_m: 'kouzen (m)',
      cousin_f: 'kouzin (f)',
      nephew: 'neve',
      niece: 'nyes'
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

      categoryBtn.innerHTML = this._categories[i]
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
  }

  parseData() {
    for (var index in this._vocabulary) {
      if (this._vocabulary[index].category == this._category) {
        this._english = Object.keys(this._vocabulary[index].words);
        this._kreyol = Object.values(this._vocabulary[index].words);
      }
    }
  }

  makeCards() {
    let vocabCard, vocabText;
    const vocabWrapper = document.getElementById('vocabulary__wrapper');

    this.parseData();

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
    if (counter < this._kreyol.length) {
      this._vocabText.innerHTML = this._kreyol[counter++];
    } else {
      counter = this._kreyol.length;
    }
  }

  prevCard(counter) {
    if (counter >= 0) {
      this._vocabText.innerHTML = this._kreyol[counter--];
    } else {
      counter = 0;
    }
  }
}


/*render card category on click */
const categoryWrapper = document.getElementById('vocabulary__category-wrapper');
const vocabWrapper = document.getElementById('vocabulary__wrapper');
const nextBtn = document.getElementById('next');
const body = document.getElementsByTagName('body')[0];
let card;
let counter = 0;

let cat = new Categories(vocabulary);
cat.renderCategoryButtons();

categoryWrapper.classList.add('show');

document.addEventListener('click', function(e) {
  let target = e.target;
  if (categoryWrapper.classList.contains('show')) {
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
  }

  if (target.classList.contains('vocabulary__card') || target.classList.contains('vocabulary__text')) {
    card.showTranslation(counter);
  }

  if (target.id && target.id === 'next') {
    counter++;
    card.nextCard(counter);
  } else if (target.id && target.id === 'prev') {
    counter--;
    card.prevCard(counter);
    if (counter < 0) {
      counter = 0;
    }
  }

}, false);
