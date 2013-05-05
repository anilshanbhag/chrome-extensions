$(function(){

var select_dialect = document.getElementById('select_dialect'),
    select_language = document.getElementById('select_language');

var currentFile = "default";

var langs =
[['Afrikaans',       ['af-ZA']],
 ['Bahasa Indonesia',['id-ID']],
 ['Bahasa Melayu',   ['ms-MY']],
 ['Català',          ['ca-ES']],
 ['Čeština',         ['cs-CZ']],
 ['Deutsch',         ['de-DE']],
 ['English',         ['en-AU', 'Australia'],
                     ['en-CA', 'Canada'],
                     ['en-IN', 'India'],
                     ['en-NZ', 'New Zealand'],
                     ['en-ZA', 'South Africa'],
                     ['en-GB', 'United Kingdom'],
                     ['en-US', 'United States']],
 ['Español',         ['es-AR', 'Argentina'],
                     ['es-BO', 'Bolivia'],
                     ['es-CL', 'Chile'],
                     ['es-CO', 'Colombia'],
                     ['es-CR', 'Costa Rica'],
                     ['es-EC', 'Ecuador'],
                     ['es-SV', 'El Salvador'],
                     ['es-ES', 'España'],
                     ['es-US', 'Estados Unidos'],
                     ['es-GT', 'Guatemala'],
                     ['es-HN', 'Honduras'],
                     ['es-MX', 'México'],
                     ['es-NI', 'Nicaragua'],
                     ['es-PA', 'Panamá'],
                     ['es-PY', 'Paraguay'],
                     ['es-PE', 'Perú'],
                     ['es-PR', 'Puerto Rico'],
                     ['es-DO', 'República Dominicana'],
                     ['es-UY', 'Uruguay'],
                     ['es-VE', 'Venezuela']],
 ['Euskara',         ['eu-ES']],
 ['Français',        ['fr-FR']],
 ['Galego',          ['gl-ES']],
 ['Hrvatski',        ['hr_HR']],
 ['IsiZulu',         ['zu-ZA']],
 ['Íslenska',        ['is-IS']],
 ['Italiano',        ['it-IT', 'Italia'],
                     ['it-CH', 'Svizzera']],
 ['Magyar',          ['hu-HU']],
 ['Nederlands',      ['nl-NL']],
 ['Norsk bokmål',    ['nb-NO']],
 ['Polski',          ['pl-PL']],
 ['Português',       ['pt-BR', 'Brasil'],
                     ['pt-PT', 'Portugal']],
 ['Română',          ['ro-RO']],
 ['Slovenčina',      ['sk-SK']],
 ['Suomi',           ['fi-FI']],
 ['Svenska',         ['sv-SE']],
 ['Türkçe',          ['tr-TR']],
 ['български',       ['bg-BG']],
 ['Pусский',         ['ru-RU']],
 ['Српски',          ['sr-RS']],
 ['한국어',            ['ko-KR']],
 ['中文',             ['cmn-Hans-CN', '普通话 (中国大陆)'],
                     ['cmn-Hans-HK', '普通话 (香港)'],
                     ['cmn-Hant-TW', '中文 (台灣)'],
                     ['yue-Hant-HK', '粵語 (香港)']],
 ['日本語',           ['ja-JP']],
 ['Lingua latīna',   ['la']]];

function updateCountry() {
  for (var i = select_dialect.options.length - 1; i >= 0; i--) {
    select_dialect.remove(i);
  }
  var list = langs[select_language.selectedIndex];
  for (var i = 1; i < list.length; i++) {
    select_dialect.options.add(new Option(list[i][1], list[i][0]));
  }
  select_dialect.style.visibility = list[1].length == 1 ? 'hidden' : 'visible';

  localStorage['country'] = select_language.selectedIndex;
}

function updateLanguage() {
  var list = langs[select_language.selectedIndex];
  select_dialect.style.visibility = list[1].length == 1 ? 'hidden' : 'visible';
  localStorage['dialect'] = select_dialect.selectedIndex;  
  document.getElementById('voiceBtn').setAttribute('lang', list[select_dialect.selectedIndex + 1][0]);
}

function updateVoiceBtn() {
  var editorOffset = $('#editor').offset();
  var offsetTop = editorOffset.top ;
  var offsetLeft = editorOffset.left + $('#editor').innerWidth() - 60;
  $('#voiceBtn').css('position','absolute').offset({top: offsetTop, left: offsetLeft});
}

function getEntries() {
  if(!localStorage['fileEntries']) return {};
  return JSON.parse(localStorage['fileEntries']);
}

function createFile() {
  var fileName = document.querySelector('#fileName').value,
    entries = getEntries();

  if (!fileName) {
    $('#createError').css('display', 'block');
    $('#createError').html('Filename empty!');
    return;
  }
  
  if (!entries) {
    entries = {};
  }

  if (fileName in entries) {
    $('#createError').css('display', 'block');
    $('#createError').html('Filename already exists!');
    return;    
  }

  entries[currentFile] = document.getElementById('editor').innerHTML;
  entries[fileName] = "";

  currentFile = fileName;
  $('#noteTitle').html(fileName + ' note');

  localStorage['fileEntries'] = JSON.stringify(entries);
  $('#createFileModal').modal('hide');
}

function openFile(fileName) {
  var entries = getEntries();

  if(!(fileName in entries)) {
    console.log("Note doesnt exist");
    return;  
  }

  entries[currentFile] = document.getElementById('editor').innerHTML;
  document.getElementById('editor').innerHTML = entries[fileName];

  currentFile = fileName;
  $('#noteTitle').html(fileName + ' note');

  $('#openFileModal').modal('hide');
  localStorage['fileEntries'] = JSON.stringify(entries);
}

function openFileModal() {
  var fileTable = document.getElementById('fileTable'),
    entries = getEntries();

  fileTable.innerHTML = "";

  var row = document.createElement('tr');
  var fileNameColumn = document.createElement('th');
  fileNameColumn.innerHTML = "Note Name";
  row.appendChild(fileNameColumn);
  fileTable.appendChild(row);

  for (i in entries) {
    if (i) {
      var row = document.createElement('tr');
      row.className = "rowSelectable";
      row.id = i;
      var fileNameColumn = document.createElement('td');
      fileNameColumn.innerHTML = i;
      row.appendChild(fileNameColumn);
      row.addEventListener('click', function(){ openFile(this.id); }, false);
      fileTable.appendChild(row);
    }
  }
}

function saveFile(){
  var entries = getEntries();
  
  if (!entries) {
    entries = {};
  }

  entries[currentFile] = document.getElementById('editor').innerHTML;
  localStorage['fileEntries'] = JSON.stringify(entries);  
}

function initToolbarBootstrapBindings() {
  var fonts = ['Serif', 'Sans', 'Arial', 'Arial Black', 'Courier', 
        'Courier New', 'Comic Sans MS', 'Helvetica', 'Impact', 'Lucida Grande', 'Lucida Sans', 'Tahoma', 'Times',
        'Times New Roman', 'Verdana'],
        fontTarget = $('[title=Font]').siblings('.dropdown-menu');
  $.each(fonts, function (idx, fontName) {
      fontTarget.append($('<li><a data-edit="fontName ' + fontName +'" style="font-family:\''+ fontName +'\'">'+fontName + '</a></li>'));
  });
  $('a[title]').tooltip({container:'body'});
	$('.dropdown-menu input').click(function() {return false;})
    .change(function () {$(this).parent('.dropdown-menu').siblings('.dropdown-toggle').dropdown('toggle');})
    .keydown('esc', function () {this.value='';$(this).change();});

  $('[data-role=magic-overlay]').each(function () { 
    var overlay = $(this), target = $(overlay.data('target')); 
    overlay.css('opacity', 0).css('position', 'absolute').offset(target.offset()).width(target.outerWidth()).height(target.outerHeight());
  });

  if ("onwebkitspeechchange"  in document.createElement("input")) {
    var editorOffset = $('#editor').offset();
    var offsetTop = editorOffset.top ;
    var offsetLeft = editorOffset.left + $('#editor').innerWidth() - 60;
    $('#voiceBtn').css('position','absolute').offset({top: offsetTop, left: offsetLeft});
  } else {
    $('#voiceBtn').hide();
  }
};

select_language.addEventListener('change', function() { updateCountry(); }, false);
select_dialect.addEventListener('change', function() { updateLanguage(); }, false);
select_language.addEventListener('change', function() { updateLanguage(); }, false);

document.querySelector('#fileCreate').addEventListener('click', function() { 
  createFile(); 
}, false);
document.querySelector('#openFile').addEventListener('click', function() { 
  openFileModal();
}, false);
document.querySelector('#saveFile').addEventListener('click', function() { 
  saveFile(); 
}, false);

document.addEventListener("keydown", function(e) {
  // CTRL S
  if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
    e.preventDefault();
    saveFile(); 
  }  // CTRL N
  else if (e.keyCode == 77 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
    e.preventDefault();
    $('#createFileModal').modal('show');
  }  // CTRL O
  else if (e.keyCode == 79 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
    e.preventDefault();
    openFileModal();
    $('#openFileModal').modal('show');
  }
}, false);

  if(navigator.onLine) {
    $('#fb-div').html('<iframe src="http://www.facebook.com/plugins/like.php?href=http%3A%2F%2Fwww.facebook.com%2Fexzalt&amp;send=false&amp;layout=standard&amp;width=300&amp;show_faces=true&amp;font&amp;colorscheme=light&amp;action=like&amp;height=80&amp;appId=138086856292147" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:300px; height:80px;" allowTransparency="true"></iframe>');
  }

  for (var i = 0; i < langs.length; i++) {
    select_language.options[i] = new Option(langs[i][0], i);
  }

  select_language.selectedIndex = localStorage['country'] || 6;
  updateCountry();
  select_dialect.selectedIndex = localStorage['dialect'] || 6;
  updateLanguage();



  initToolbarBootstrapBindings();  
  $('#editor').wysiwyg();
  window.prettyPrint && prettyPrint();
});