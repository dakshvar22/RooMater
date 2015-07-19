/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

$(document).ready(function() {

  var widgetId = 'vizcontainer', // Must match the ID in index.jade
    widgetWidth = 700, widgetHeight = 700, // Default width and height
    personImageUrl = 'images/app.png', // Can be blank
    language = 'en'; // language selection

  // Jquery variables
  var $content = $('.content'),
    $loading   = $('.loading'),
    $error     = $('.error'),
    $errorMsg  = $('.errorMsg'),
    $traits    = $('.traits'),
    $results   = $('.results');

  /**
   * Clear the "textArea"
   */
  $('.clear-btn').click(function(){
    $('.clear-btn').blur();
    $content.val('');
    updateWordsCount();
  });

  /**
   * Update words count on change
   */
  $content.change(updateWordsCount);

  /**
   * Update words count on copy/past
   */
  $content.bind('paste', function() {
    setTimeout(updateWordsCount, 100);
  });

  /**
   * 1. Create the request
   * 2. Call the API
   * 3. Call the methods to display the results
   */
  $('.analysis-btn').click(function(){
    $('.analysis-btn').blur();
	console.log('called');
    $loading.show();
    $error.hide();
    $traits.hide();
    $results.hide();
    var response = {
        "id": "*UNKNOWN*",
        "source": "*UNKNOWN*",
        "word_count": 780,
        "word_count_message": "There were 780 words in the text, we recommend text with at least 100 (and preferably 2,000) words",
        "processed_lang": "en",
        "tree": {
            "id": "r",
            "name": "root",
            "children": [
                {
                    "id": "personality",
                    "name": "Big 5 ",
                    "children": [
                        {
                            "id": "Openness_parent",
                            "name": "Openness",
                            "category": "personality",
                            "percentage": 0.9574993736180797,
                            "children": [
                                {
                                    "id": "Openness",
                                    "name": "Openness",
                                    "category": "personality",
                                    "percentage": 0.9574993736180797,
                                    "sampling_error": 0.060073092,
                                    "children": [
                                        {
                                            "id": "Adventurousness",
                                            "name": "Adventurousness",
                                            "category": "personality",
                                            "percentage": 0.8629318380336666,
                                            "sampling_error": 0.050851165999999996
                                        },
                                        {
                                            "id": "Artistic interests",
                                            "name": "Artistic interests",
                                            "category": "personality",
                                            "percentage": 0.17238896771426976,
                                            "sampling_error": 0.104060484
                                        },
                                        {
                                            "id": "Emotionality",
                                            "name": "Emotionality",
                                            "category": "personality",
                                            "percentage": 0.11342041379058927,
                                            "sampling_error": 0.047607119999999996
                                        },
                                        {
                                            "id": "Imagination",
                                            "name": "Imagination",
                                            "category": "personality",
                                            "percentage": 0.9857574798381225,
                                            "sampling_error": 0.063970818
                                        },
                                        {
                                            "id": "Intellect",
                                            "name": "Intellect",
                                            "category": "personality",
                                            "percentage": 0.9738845635828898,
                                            "sampling_error": 0.055856178
                                        },
                                        {
                                            "id": "Liberalism",
                                            "name": "Authority-challenging",
                                            "category": "personality",
                                            "percentage": 0.8900042450425919,
                                            "sampling_error": 0.083444552
                                        }
                                    ]
                                },
                                {
                                    "id": "Conscientiousness",
                                    "name": "Conscientiousness",
                                    "category": "personality",
                                    "percentage": 0.796122941228724,
                                    "sampling_error": 0.075873388,
                                    "children": [
                                        {
                                            "id": "Achievement striving",
                                            "name": "Achievement striving",
                                            "category": "personality",
                                            "percentage": 0.6477594763956556,
                                            "sampling_error": 0.098430128
                                        },
                                        {
                                            "id": "Cautiousness",
                                            "name": "Cautiousness",
                                            "category": "personality",
                                            "percentage": 0.8929500067171751,
                                            "sampling_error": 0.091587828
                                        },
                                        {
                                            "id": "Dutifulness",
                                            "name": "Dutifulness",
                                            "category": "personality",
                                            "percentage": 0.2837636871915445,
                                            "sampling_error": 0.060054906
                                        },
                                        {
                                            "id": "Orderliness",
                                            "name": "Orderliness",
                                            "category": "personality",
                                            "percentage": 0.017758169762479157,
                                            "sampling_error": 0.069990306
                                        },
                                        {
                                            "id": "Self-discipline",
                                            "name": "Self-discipline",
                                            "category": "personality",
                                            "percentage": 0.5246946998497977,
                                            "sampling_error": 0.046973522
                                        },
                                        {
                                            "id": "Self-efficacy",
                                            "name": "Self-efficacy",
                                            "category": "personality",
                                            "percentage": 0.8667932146996925,
                                            "sampling_error": 0.09215224200000001
                                        }
                                    ]
                                },
                                {
                                    "id": "Extraversion",
                                    "name": "Extraversion",
                                    "category": "personality",
                                    "percentage": 0.18668909904979364,
                                    "sampling_error": 0.056562864,
                                    "children": [
                                        {
                                            "id": "Activity level",
                                            "name": "Activity level",
                                            "category": "personality",
                                            "percentage": 0.22237179818459396,
                                            "sampling_error": 0.077645544
                                        },
                                        {
                                            "id": "Assertiveness",
                                            "name": "Assertiveness",
                                            "category": "personality",
                                            "percentage": 0.2933841737950141,
                                            "sampling_error": 0.08299078800000001
                                        },
                                        {
                                            "id": "Cheerfulness",
                                            "name": "Cheerfulness",
                                            "category": "personality",
                                            "percentage": 0.0868790692221312,
                                            "sampling_error": 0.104594752
                                        },
                                        {
                                            "id": "Excitement-seeking",
                                            "name": "Excitement-seeking",
                                            "category": "personality",
                                            "percentage": 0.07101987144631221,
                                            "sampling_error": 0.08048757
                                        },
                                        {
                                            "id": "Friendliness",
                                            "name": "Outgoing",
                                            "category": "personality",
                                            "percentage": 0.09329689266163238,
                                            "sampling_error": 0.074996334
                                        },
                                        {
                                            "id": "Gregariousness",
                                            "name": "Gregariousness",
                                            "category": "personality",
                                            "percentage": 0.025448655243929592,
                                            "sampling_error": 0.057586468
                                        }
                                    ]
                                },
                                {
                                    "id": "Agreeableness",
                                    "name": "Agreeableness",
                                    "category": "personality",
                                    "percentage": 0.0779237371746293,
                                    "sampling_error": 0.096469792,
                                    "children": [
                                        {
                                            "id": "Altruism",
                                            "name": "Altruism",
                                            "category": "personality",
                                            "percentage": 0.32759862124208766,
                                            "sampling_error": 0.070336644
                                        },
                                        {
                                            "id": "Cooperation",
                                            "name": "Cooperation",
                                            "category": "personality",
                                            "percentage": 0.5290203031883792,
                                            "sampling_error": 0.07947913000000001
                                        },
                                        {
                                            "id": "Modesty",
                                            "name": "Modesty",
                                            "category": "personality",
                                            "percentage": 0.04930348081811132,
                                            "sampling_error": 0.055733568
                                        },
                                        {
                                            "id": "Morality",
                                            "name": "Uncompromising",
                                            "category": "personality",
                                            "percentage": 0.057816382645646855,
                                            "sampling_error": 0.06268372800000001
                                        },
                                        {
                                            "id": "Sympathy",
                                            "name": "Sympathy",
                                            "category": "personality",
                                            "percentage": 0.48157247384150886,
                                            "sampling_error": 0.097179544
                                        },
                                        {
                                            "id": "Trust",
                                            "name": "Trust",
                                            "category": "personality",
                                            "percentage": 0.17183368808223012,
                                            "sampling_error": 0.055478124000000004
                                        }
                                    ]
                                },
                                {
                                    "id": "Neuroticism",
                                    "name": "Emotional range",
                                    "category": "personality",
                                    "percentage": 0.058157943987829835,
                                    "sampling_error": 0.090492952,
                                    "children": [
                                        {
                                            "id": "Anger",
                                            "name": "Fiery",
                                            "category": "personality",
                                            "percentage": 0.13334728929102938,
                                            "sampling_error": 0.093797276
                                        },
                                        {
                                            "id": "Anxiety",
                                            "name": "Prone to worry",
                                            "category": "personality",
                                            "percentage": 0.009918986330480075,
                                            "sampling_error": 0.054877294
                                        },
                                        {
                                            "id": "Depression",
                                            "name": "Melancholy",
                                            "category": "personality",
                                            "percentage": 0.1172005606587373,
                                            "sampling_error": 0.058440822
                                        },
                                        {
                                            "id": "Immoderation",
                                            "name": "Immoderation",
                                            "category": "personality",
                                            "percentage": 0.0394593342312253,
                                            "sampling_error": 0.052552138
                                        },
                                        {
                                            "id": "Self-consciousness",
                                            "name": "Self-consciousness",
                                            "category": "personality",
                                            "percentage": 0.18887194182842326,
                                            "sampling_error": 0.05631177
                                        },
                                        {
                                            "id": "Vulnerability",
                                            "name": "Susceptible to stress",
                                            "category": "personality",
                                            "percentage": 0.008965550887503601,
                                            "sampling_error": 0.085108284
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": "needs",
                    "name": "Needs",
                    "children": [
                        {
                            "id": "Self-expression_parent",
                            "name": "Self-expression",
                            "category": "needs",
                            "percentage": 0.10439143129772809,
                            "children": [
                                {
                                    "id": "Challenge",
                                    "name": "Challenge",
                                    "category": "needs",
                                    "percentage": 0.21164496913858538,
                                    "sampling_error": 0.0830311
                                },
                                {
                                    "id": "Closeness",
                                    "name": "Closeness",
                                    "category": "needs",
                                    "percentage": 0.4585857063189021,
                                    "sampling_error": 0.08203496
                                },
                                {
                                    "id": "Curiosity",
                                    "name": "Curiosity",
                                    "category": "needs",
                                    "percentage": 0.5852249285154861,
                                    "sampling_error": 0.11868540000000001
                                },
                                {
                                    "id": "Excitement",
                                    "name": "Excitement",
                                    "category": "needs",
                                    "percentage": 0.2651404719537488,
                                    "sampling_error": 0.107726512
                                },
                                {
                                    "id": "Harmony",
                                    "name": "Harmony",
                                    "category": "needs",
                                    "percentage": 0.13389143644670212,
                                    "sampling_error": 0.107902076
                                },
                                {
                                    "id": "Ideal",
                                    "name": "Ideal",
                                    "category": "needs",
                                    "percentage": 0.5420621650232471,
                                    "sampling_error": 0.09746072600000001
                                },
                                {
                                    "id": "Liberty",
                                    "name": "Liberty",
                                    "category": "needs",
                                    "percentage": 0.1976455818136082,
                                    "sampling_error": 0.143918552
                                },
                                {
                                    "id": "Love",
                                    "name": "Love",
                                    "category": "needs",
                                    "percentage": 0.14738783345585038,
                                    "sampling_error": 0.098999382
                                },
                                {
                                    "id": "Practicality",
                                    "name": "Practicality",
                                    "category": "needs",
                                    "percentage": 0.24007486284958257,
                                    "sampling_error": 0.085657502
                                },
                                {
                                    "id": "Self-expression",
                                    "name": "Self-expression",
                                    "category": "needs",
                                    "percentage": 0.10439143129772809,
                                    "sampling_error": 0.080374414
                                },
                                {
                                    "id": "Stability",
                                    "name": "Stability",
                                    "category": "needs",
                                    "percentage": 0.569745403015264,
                                    "sampling_error": 0.104797758
                                },
                                {
                                    "id": "Structure",
                                    "name": "Structure",
                                    "category": "needs",
                                    "percentage": 0.6528815828676431,
                                    "sampling_error": 0.078575884
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": "values",
                    "name": "Values",
                    "children": [
                        {
                            "id": "Self-enhancement_parent",
                            "name": "Self-enhancement",
                            "category": "values",
                            "percentage": 0.9153951370727524,
                            "children": [
                                {
                                    "id": "Conservation",
                                    "name": "Conservation",
                                    "category": "values",
                                    "percentage": 0.32881183978705586,
                                    "sampling_error": 0.067148664
                                },
                                {
                                    "id": "Openness to change",
                                    "name": "Openness to change",
                                    "category": "values",
                                    "percentage": 0.8550289634992763,
                                    "sampling_error": 0.064016758
                                },
                                {
                                    "id": "Hedonism",
                                    "name": "Hedonism",
                                    "category": "values",
                                    "percentage": 0.36626403433536553,
                                    "sampling_error": 0.136209692
                                },
                                {
                                    "id": "Self-enhancement",
                                    "name": "Self-enhancement",
                                    "category": "values",
                                    "percentage": 0.9153951370727524,
                                    "sampling_error": 0.102034536
                                },
                                {
                                    "id": "Self-transcendence",
                                    "name": "Self-transcendence",
                                    "category": "values",
                                    "percentage": 0.3082046756858722,
                                    "sampling_error": 0.079638318
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    };
	showVizualization(response);
    /*$.ajax({
      type: 'POST',
      data: {
        text: $content.val(),
        language: language
      },
      url: '/',
      dataType: 'json',
      success: function(response) {
        $loading.hide();
        console.log(JSON.stringify(response));

        if (response.error) {
          showError(response.error);
        } else {
          $results.show();
          showTraits(response);
          showTextSummary(response);
          showVizualization(response);
        }

      },
      error: function(xhr) {
        $loading.hide();

        var error;
        try {
          error = JSON.parse(xhr.responseText || {});
        } catch(e) {}
        showError(error.error || error);
      }
    })*/;
  });

  /**
   * Display an error or a default message
   * @param  {String} error The error
   */
  function showError(error) {
    var defaultErrorMsg = 'Error processing the request, please try again later.';
    $error.show();
    $errorMsg.text(error || defaultErrorMsg);
  }

  /**
   * Displays the traits received from the
   * Personality Insights API in a table,
   * just trait names and values.
   */
  function showTraits(data) {
    console.log('showTraits()');
    $traits.show();

    var traitList = flatten(data.tree),
      table = $traits;

    table.empty();

    // Header
    $('#header-template').clone().appendTo(table);

    // For each trait
    for (var i = 0; i < traitList.length; i++) {
      var elem = traitList[i];

      var Klass = 'row';
      Klass += (elem.title) ? ' model_title' : ' model_trait';
      Klass += (elem.value === '') ? ' model_name' : '';

      if (elem.value !== '') { // Trait child name
        $('#trait-template').clone()
          .attr('class', Klass)
          .find('.tname')
          .find('span').html(elem.id).end()
          .end()
          .find('.tvalue')
            .find('span').html(elem.value === '' ?  '' : (elem.value + ' (± '+ elem.sampling_error+')'))
            .end()
          .end()
          .appendTo(table);
      } else {
        // Model name
        $('#model-template').clone()
          .attr('class', Klass)
          .find('.col-lg-12')
          .find('span').html(elem.id).end()
          .end()
          .appendTo(table);
      }
    }
  }

  /**
   * Construct a text representation for big5 traits crossing, facets and
   * values.
   */
  function showTextSummary(data) {
    console.log('showTextSummary()');
    var paragraphs = textSummary.assemble(data.tree);
    var div = $('.summary-div');
    div.empty();
    paragraphs.forEach(function(sentences) {
      $('<p></p>').text(sentences.join(' ')).appendTo(div);
    });
  }

/**
 * Renders the sunburst visualization. The parameter is the tree as returned
 * from the Personality Insights JSON API.
 * It uses the arguments widgetId, widgetWidth, widgetHeight and personImageUrl
 * declared on top of this script.
 */
function showVizualization(theProfile) {
  console.log('showVizualization()');

  $('#' + widgetId).empty();
  var d3vis = d3.select('#' + widgetId).append('svg:svg');
  var widget = {
    d3vis: d3vis,
    data: theProfile,
    loadingDiv: 'dummy',
    switchState: function() {
      console.log('[switchState]');
    },
    _layout: function() {
      console.log('[_layout]');
    },
    showTooltip: function() {
      console.log('[showTooltip]');
    },
    id: 'SystemUWidget',
    COLOR_PALLETTE: ['#1b6ba2', '#488436', '#d52829', '#F53B0C', '#972a6b', '#8c564b', '#dddddd'],
    expandAll: function() {
      this.vis.selectAll('g').each(function() {
        var g = d3.select(this);
        if (g.datum().parent && // Isn't the root g object.
          g.datum().parent.parent && // Isn't the feature trait.
          g.datum().parent.parent.parent) { // Isn't the feature dominant trait.
          g.attr('visibility', 'visible');
        }
      });
    },
    collapseAll: function() {
      this.vis.selectAll('g').each(function() {
        var g = d3.select(this);
        if (g.datum().parent !== null && // Isn't the root g object.
          g.datum().parent.parent !== null && // Isn't the feature trait.
          g.datum().parent.parent.parent !== null) { // Isn't the feature dominant trait.
          g.attr('visibility', 'hidden');
        }
      });
    },
    addPersonImage: function(url) {
      if (!this.vis || !url) {
        return;
      }
      var icon_defs = this.vis.append('defs');
      var width = this.dimW,
        height = this.dimH;

      // The flower had a radius of 640 / 1.9 = 336.84 in the original, now is 3.2.
      var radius = Math.min(width, height) / 16.58; // For 640 / 1.9 -> r = 65
      var scaled_w = radius * 2.46; // r = 65 -> w = 160

      var id = 'user_icon_' + this.id;
      icon_defs.append('pattern')
        .attr('id', id)
        .attr('height', 1)
        .attr('width', 1)
        .attr('patternUnits', 'objectBoundingBox')
        .append('image')
        .attr('width', scaled_w)
        .attr('height', scaled_w)
        .attr('x', radius - scaled_w / 2) // r = 65 -> x = -25
        .attr('y', radius - scaled_w / 2)
        .attr('xlink:href', url)
        .attr('opacity', 1.0)
        .on('dblclick.zoom', null);
      this.vis.append('circle')
        .attr('r', radius)
        .attr('stroke-width', 0)
        .attr('fill', 'url(#' + id + ')');
    }
  };

  widget.dimH = widgetHeight;
  widget.dimW = widgetWidth;
  widget.d3vis.attr('width', widget.dimW).attr('height', widget.dimH);
  widget.d3vis.attr('viewBox', "0 0 " + widget.dimW + ", " + widget.dimH);
  renderChart.call(widget);
  widget.expandAll.call(widget);
  if (personImageUrl)
    widget.addPersonImage.call(widget, personImageUrl);
}

  /**
   * Returns a 'flattened' version of the traits tree, to display it as a list
   * @return array of {id:string, title:boolean, value:string} objects
   */
  function flatten( /*object*/ tree) {
    var arr = [],
      f = function(t, level) {
        if (!t) return;
        if (level > 0 && (!t.children || level !== 2)) {
          arr.push({
            'id': t.name,
            'title': t.children ? true : false,
            'value': (typeof (t.percentage) !== 'undefined') ? Math.floor(t.percentage * 100) + '%' : '',
            'sampling_error': (typeof (t.sampling_error) !== 'undefined') ? Math.floor(t.sampling_error * 100) + '%' : ''
          });
        }
        if (t.children && t.id !== 'sbh') {
          for (var i = 0; i < t.children.length; i++) {
            f(t.children[i], level + 1);
          }
        }
      };
    f(tree, 0);
    return arr;
  }

  function updateWordsCount() {
    var text = $content.val();
    var wordsCount = text.match(/\S+/g) ? text.match(/\S+/g).length : 0;
    $('.wordsCountFootnote').css('color',wordsCount < 100 ? 'red' : 'gray');
    $('.wordsCount').text(wordsCount);
  }

  function onSampleTextChange() {
    var isEnglish = $('#english_radio').is(':checked');
    language = isEnglish ? 'en' : 'es';

    $.get('/text/' + language + '.txt').done(function(text) {
      $content.val(text);
      updateWordsCount();
    });
  }

  onSampleTextChange();
  $content.keyup(updateWordsCount);
  $('.sample-radio').change(onSampleTextChange);
});
