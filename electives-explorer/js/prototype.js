// Data for the radar chart.
var data = [
            [
            {axis:"Communication",value:0},
            {axis:"Logic",value:0},
            {axis:"Research",value:0},
            {axis:"Creativity",value:0},
            {axis:"Culture",value:0},
          ],[
            {axis:"Communication",value:0},
            {axis:"Logic",value:0},
            {axis:"Research",value:0},
            {axis:"Creativity",value:0},
            {axis:"Culture",value:0},
          ],[
            {axis:"Communication",value:0},
            {axis:"Logic",value:0},
            {axis:"Research",value:0},
            {axis:"Creativity",value:0},
            {axis:"Culture",value:0},
          ]
        ]
var curCommunication = 0;
var curLogic = 0;
var curResearch = 0;
var curCreativity = 0;
var curCulture = 0;
var previewCommunication = 0;
var previewLogic = 0;
var previewResearch = 0;
var previewCreativity = 0;
var previewCulture = 0;

var lockPreview = false;

var w = 250;
var h = 250;

// Customize options for the radar chart.
var mycfg = {
  w: w,
  h: h,
  maxValue: 0.6,
  levels: 5,
  ExtraWidthX: 300
}

// User profile 1
var prevCoursesTask1 = [ 'ARTH 101', 'ARTH 102', 'ARTH 225', 'ARTH 226', 'ARTH 227', 'ARTH 251',
                    'VISA 110', 'VISA 180', 'VISA 183', 'VISA 210', 'VISA 220', 'VISA 230',
                    'VISA 240', 'VISA 241', 'VISA 250', 'ENGL 100', 'ENGL 222', 'GERM 100'];

// User profile 2
var prevCoursesTask2 = [ 'CPSC 110', 'CPSC 121', 'MATH 100', 'MATH 101', 'PHYS 101', 'PHYS 102',
                        'ENGL 110', 'ENGL 112', 'BIOL 140'];

// Switch user profile here.
var prevCourses = prevCoursesTask2;

var skillCategories = {
    'writing': 'communication',
    'collaboration': 'communication',
    'language': 'culture',
    'ethnicstudies': 'culture',
    'art': 'creativity',
    'performance': 'creativity',
    'fieldmethods': 'research',
    'experimentalmethods': 'research',
    'tech': 'logic',
    'math': 'logic'
}


//Call function to draw the Radar chart
//Will expect that data is in %'s

function updateData(index) {
    RadarChart.draw('#chart', data[index], mycfg);
    initLegend();
}
function previewCourse(course) {
    // Pentagon
    //updateData(1);

    // remove any old previews
    $('[id$=-progress-bar-preview]').remove();

    // unhighlight tabs
    $('[id$=-tab]').removeClass('selected-course');

    // unhighlight all rows in table
    $('#search-results-table').find('tr').each(function() {
        $(this).removeClass('selected-course');
    });

    // Switch "Close Preview" button to "Preview Skill Profile"
    $('[name$=-preview-btn]').html("Preview Skill Profile");
    $('[name$=-preview-btn]').attr('onclick', "previewCourse(this);");

    var row = $(course).closest('tr');
    var name = $(row).attr('name');

    // Switch "Preview Skill Profile" button to "Close Preview"
    $(course).html("Close Preview");
    $(course).attr('onclick', "closePreview();");

    // Progress Bar
    addToProgressBarPreview(name);

    // Highlighting row in red
    $(row).addClass('selected-course');

    $('.radar-chart-serie0').show();

    // Chart status description
    $('#course-name-preview').html('Previewing ' + name);

}

function closePreview() {
    // remove preview
    $('[id^=-progress-bar-preview]').remove();

    // Switch "Close Preview" button to "Preview Skill Profile"
    $('[name$=-preview-btn]').html("Preview Skill Profile");
    $('[name$=-preview-btn]').attr('onclick', "previewCourse(this);");

    // unhighlight tabs
    $('[id$=-tab]').removeClass('selected-course');

    // Unhighlighting Row
    $('tr').removeClass('selected-course');

    $('.radar-chart-serie0').hide();

    $('#course-name-preview').html('');

    // reinitialize progress bar
    initProgressBar();
}

function addCourse(course) {
    closePreview();

    var row = $(course).closest('tr');
    var name = $(row).attr('name');

    // remove row from search results
    $(row).hide();

    // Setting confirmation body text
    $('#add-course-confirmation-body').html('Course <b>' + name + '</b> has been successfully added to your worklist.'
    + '<br><span id="added-course-success-icon" class="glyphicon glyphicon-ok-circle"></span>');

    // Add course to prevCourses
    prevCourses.push(name);

    // reinitialize progress bar
    initProgressBar();

    // Showing modal confirmation that course has been added
    $('#add-course-confirmation').modal();
}

function removeCourse() {
    var course = prevCourses.pop();
    var row = $('[name="' + course + '"]');

    // display row in search menu again
    $(row).show();

    // reinitialize progress bar
    initProgressBar();

    // close modal
    $('#add-course-confirmation').modal('hide');

    // radar chart
}

////////////////////////////////////////////
/////////// Initiate legend ////////////////
////////////////////////////////////////////
function initLegend() {
    var svg = d3.select('#body')
        .selectAll('svg')
        .append('svg')
        .attr("width", w+300)
        .attr("height", h+300)

    //Create the title for the legend
    var text = svg.append("text")
        .attr("class", "title")
        .attr("x", w+(w/2) )
        .attr("y", h+80)
        .attr("text-anchor", "middle")
        .attr("font-size", "18px")
        .attr("font-weight", 500);
}

// //Initiate Legend
// var legend = svg.append("g")
//  .attr("class", "legend")
//  .attr("height", 100)
//  .attr("width", 200)
//  .attr('transform', 'translate(90,20)')
//  ;
//  //Create colour squares
//  legend.selectAll('rect')
//    .data(LegendOptions)
//    .enter()
//    .append("rect")
//    .attr("x", w - 65)
//    .attr("y", function(d, i){ return i * 20;})
//    .attr("width", 10)
//    .attr("height", 10)
//    .style("fill", function(d, i){ return colorscale(i);})
//    ;
//  //Create text next to squares
//  legend.selectAll('text')
//    .data(LegendOptions)
//    .enter()
//    .append("text")
//    .attr("x", w - 52)
//    .attr("y", function(d, i){ return i * 20 + 9;})
//    .attr("font-size", "11px")
//    .attr("fill", "#737373")
//    .text(function(d) { return d; })
//    ;


///////////////////////////////////////////////////////////
// PROGRESS BAR
///////////////////////////////////////////////////////////
// Set Initial Progress Bar Values
///////////////////////////////////////////////////////////

function initProgressBar() {

    // Empty the progress bars.
    $.each($(".progress-bar"), function() {
        $(this).attr('aria-valuenow', 0);
        $(this).css('width', 0 + '%');
    });

    // Reset Current internal Values
    initCurrent();

    // Empty course list
    $('[id^=courses-]').find("ul").html("");

    // Fill progress bars with initial values.
    for (var i = 0; i < prevCourses.length; ++i) {
        if (prevCourses[i] in skill_hash) {
            for (var skillKey in skill_hash[prevCourses[i]]) {
                // Calculate the new value.
                var currVal = parseInt($('#' + skillKey).attr('aria-valuenow'));
                var addedVal = skill_hash[prevCourses[i]][skillKey];
                var newVal = currVal + addedVal;

                // Set RadarChart data
                setRadarData(skillKey, addedVal, "cur");


                // Update the progress bar with the new value.
                $('#' + skillKey).attr('aria-valuenow', newVal);
                $('#' + skillKey).css('width', (newVal / 120) * 100 + '%');

                // Populate the course list for each skill.
                $("#courses-" + skillKey).find("ul").append("<li>" + prevCourses[i] + "</li>");
            }
        }
    }

    // Indicate if a course list is empty.
    for (var skill in skillCategories) {
        if ($("#courses-" + skill).find("ul").text().length === 0) {
            $("#courses-" + skill).find("ul").append("<li>No courses applied to this skill</li>");
        }
    }

    // Update RadarChart
    initRadarChart();
}

function setRadarData(skillKey, currVal, prefix) {
    switch (skillKey) {
        case "math":
        case "tech":
            window[prefix+"Logic"] += currVal;
            break;
        case "art":
        case "music":
            window[prefix+"Creativity"] += currVal;
            break;
        case "writing":
        case "collaboration":
            window[prefix+"Communication"] += currVal;
            break;
        case "language":
        case "ethnicstudies":
            window[prefix+"Culture"] += currVal;
            break;
        case "fieldmethods":
        case "experimentalmethods":
            window[prefix+"Research"] += currVal;
            break;
        default:
            break;
    }
}

function initRadarChart() {
    var preview = data[0];
    var current = data[1];

    // Obtain maximum value to set the maximum values
    var max = updateMaximums();

    // Set blue values
    updateChart(current, "cur");

    // Set preview values
    initPreview();

    mycfg.maxValue = max;
    RadarChart.draw('#chart', data, mycfg);
    initLegend();

    $('.radar-chart-serie0').hide();
}

function initCurrent() {
    curCommunication = 0;
    curLogic = 0;
    curResearch = 0;
    curCreativity = 0;
    curCulture = 0;
}

function initPreview() {
    previewCommunication = curCommunication;
    previewLogic = curLogic;
    previewResearch = curResearch;
    previewCreativity = curCreativity;
    previewCulture = curCulture;
}

function updateChart(dataArray, prefix) {
    dataArray[0].value = window[prefix+"Communication"];
    dataArray[1].value = window[prefix+"Logic"];
    dataArray[2].value = window[prefix+"Research"];
    dataArray[3].value = window[prefix+"Creativity"];
    dataArray[4].value = window[prefix+"Culture"];
}

function updateMaximums() {
    var max = data[2];
    var maxValue = 0;
    if (curCommunication > maxValue) {maxValue = curCommunication;}
    if (curLogic > maxValue) {maxValue = curLogic;}
    if (curCreativity > maxValue) {maxValue = curCreativity;}
    if (curCulture > maxValue) {maxValue = curCulture;}
    if (curResearch > maxValue) {maxValue = curResearch;}

    for (var i in max) {
        max[i].value = maxValue;
    }
    return maxValue;
}

///////////////////////////////////////////////////////////
// Progress Bar Preview
///////////////////////////////////////////////////////////
function addToProgressBarPreview(course) {
    var skills = skill_hash[course];

        // Reset preview data
        initPreview();

        // Make deep copy to preview
        var previewData = jQuery.extend(true, [], data);

    $.each(skills, function(skillKey, skillVal){
        // highlighting tab
        var category = skillCategories[skillKey];
        $('#' + category + '-tab').addClass('selected-course');

        // calculating preview percentage
        var skillPercent = (skillVal/120)*100;

        // Give it to preview
        setRadarData(skillKey, skillVal, "preview");


        // setting preview
        var preview = '<div id="' + skillKey +
                      '-progress-bar-preview" class="progress-bar progress-bar-striped progress-bar-danger active" role="progressbar" aria-valuenow="' + skillVal +
                      '" aria-valuemin="0" aria-valuemax="120" style="width: ' + skillPercent +
                      '%;"></div>';
        $('#' + skillKey).parent().append(preview);
    });


    updateChart(previewData[0], "preview");
    RadarChart.draw('#chart', previewData, mycfg);
    initLegend();
}

///////////////////////////////////////////////////////////
// SEARCH & RESULTS
///////////////////////////////////////////////////////////
function showSearchResults(withSkill) {
    var searchSkills    = $('#search-skill').val(),
        searchYears = $('#search-year').val(),
        searchEligible = $('#eligible').prop('checked'),
        searchFaculty = $('#search-faculty').val(),
        searchSubject = $('#search-subject').val();

        if (!searchSkills && !searchYears && !searchEligible && !searchFaculty && !searchSubject) {
            window.alert('Please enter at least one search criteria!');
            return;
        }

        //clear table
        $('#search-results-table').find('tbody').html('');
        $('#pre-search-message').hide();

        var course_hash = getSearchResults();
        var courses = course_hash['order'];
        for (var i = 0; i < courses.length; i++) {
            course = courses[i];

            if ($.inArray(course, prevCourses) > -1) {
                continue;
            }

            var name = course_hash[course]['name'],
                term = course_hash[course]['term'],
                days = course_hash[course]['days'],
                time = course_hash[course]['time'],
                cred = course_hash[course]['cred'],
                eligible1 = course_hash[course]['eligible1'],
                eligible2 = course_hash[course]['eligible2'],
                link = course_hash[course]['link'],
                subj = course_hash[course]['subj'],
                fac = course_hash[course]['fac'];

            var firstSkill = course_hash[course]['skills'][0],
                secondSkill = course_hash[course]['skills'][1];

            if (searchYears) {
                // check if course matches year level
                var matchesYear = false;
                for (var j = 0; j < searchYears.length; j++) {
                    var searchYear = searchYears[j],
                        courseYear = course.substring(5,6);

                    if (courseYear == searchYear) {
                        matchesYear = true;
                    }
                }

                if (!matchesYear) {
                    continue;
                }
            }

            if (searchEligible) {
                // check if student is eligible for course
                if (prevCourses == prevCoursesTask1) {
                    if (!eligible1) {
                        continue;
                    }
                }
                if (prevCourses == prevCoursesTask2) {
                    if (!eligible2) {
                        continue;
                    }
                }
            }

            // Check if course subject matches search criteria.
            if (searchSubject) {
                if (searchSubject.join().indexOf(subj) == -1) {
                    continue;
                }
            }

            // Check if course faculty matches search criteria.
            if (searchFaculty) {
                if (searchFaculty.join().indexOf(fac) == - 1) {
                    continue;
                }
            }

            // Check if course skill(s) matches search criteria.
            if (searchSkills) {

                // Get the skills of the course.
                var skills = [];
                for (var skill in skill_hash[course]) {
                    skills.push(skill);
                }

                // Check if those skills match the search criteria.
                var matchesSkills = false;
                for (var skill in skills) {
                    if (searchSkills.indexOf(skills[skill]) > -1) {
                        matchesSkills = true;
                    }
                }

                // Skip this course if it has no matching skills.
                if (!matchesSkills) {
                    continue;
                }
            }

            var eligibleCell = '<td style="text-align:center;">' +
                               '<span class="glyphicon glyphicon-remove" aria-hidden="true" style="color:red;"></span>' +
                               '</td>';

            if (prevCourses == prevCoursesTask1) {
                if (eligible1) {
                    eligibleCell = '<td style="text-align:center;">' +
                                   '<span class="glyphicon glyphicon-ok" aria-hidden="true" style="color:green;"></span>' +
                                   '</td>';
               }
            }
            if (prevCourses == prevCoursesTask2) {
                if (eligible2) {
                    eligibleCell = '<td style="text-align:center;">' +
                                   '<span class="glyphicon glyphicon-ok" aria-hidden="true" style="color:green;"></span>' +
                                   '</td>';
                }
            }

            var actions = '<td><button class="preview-skill-profile btn btn-default btn-xs" name="' + course + '-preview-btn" onclick="previewCourse(this);" style="margin:2px;">Preview Skill Profile</button>' +
                          '<br>' +
                          '<button class="btn btn-default btn-xs" onclick="addCourse(this);" style="margin:2px;">Add to Worklist</button>' +
                          '<br>' +
                          '<a href="' + link + '" role="button" class="btn btn-default btn-xs" style="margin:2px;">' +
                          'View Course Page</a></td>';

            var skills = '<span class="first-skill label label-pill label-primary" style="margin-right:1px;">' + firstSkill + '</span>' +
                         '<span class="second-skill label label-pill label-primary">' + secondSkill + '</span>';

            var courseRow = "<tr name='" + course + "'>" +
                            "<td>" + course + "<br>" + name + "<br>" + skills + "</td>" +
                            "<td>" + term + "</td>" +
                            "<td>" + days + "</td>" +
                            "<td>" + time + "</td>" +
                            "<td>" + cred + "</td>" +
                            eligibleCell +
                            actions +
                            "</tr>";

            $('#search-results-table').find('tbody').append(courseRow);
        };

        // Show table if there are results.
        if ($('#search-results-table').find('tbody').html() == '') {
            $('#search-results-table').hide();
            $("#pre-search-message").hide();
            $('#no-results-message').show();
        }
        else {
            $('#search-results-table').show();
            $("#pre-search-message").hide();
            $('#no-results-message').hide();

            if (!withSkill) {
                $('.first-skill').hide();
                $('.second-skill').hide();
                $('.preview-skill-profile').hide();
            }
        }
}
