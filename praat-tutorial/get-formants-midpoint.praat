# This Praat script will get F1, F2, and F3 at the midpoints of all the intervals of the all files in the specified folder.
# Version: 3 Feb 2010
# Author: Shigeto Kawahara
# Input: TextGrid and wav in the same directly. They must have the same name.

form Get F1, F2, F3
	sentence Directory ./
	comment If you want to analyze all the files, leave this blank
	word Base_file_name 
	comment The name of result file 
	text textfile result.txt
endform

# Write-out the header

fileappend "'textfile$'" soundname'tab$'intervalname'tab$'F1'tab$'F2'tab$'F3'tab$' 
fileappend "'textfile$'" 'newline$'

#Read all files in a folder
Create Strings as file list... wavlist 'directory$'/'base_file_name$'*.wav
Create Strings as file list... gridlist 'directory$'/'base_file_name$'*.TextGrid
n = Get number of strings

for i to n
clearinfo

#We first extract a formant tier
	select Strings wavlist
	filename$ = Get string... i
	Read from file... 'directory$'/'filename$'
	soundname$ = selected$ ("Sound")
	To Formant (burg)... 0 5 5500 0.025 50

# We now read grid files and extract all intervals in them
	select Strings gridlist
	gridname$ = Get string... i
	Read from file... 'directory$'/'gridname$'
	int=Get number of intervals... 1

# We then calculate F1, F2 and F3

for k from 1 to 'int'
	select TextGrid 'soundname$'
	label$ = Get label of interval... 1 'k'
	if label$ <> ""

		# calculates the mid point
 		vowel_onset = Get starting point... 1 'k'
  		vowel_offset = Get end point... 1 'k'
               	midpoint = vowel_onset + ((vowel_offset - vowel_onset) / 2)

		# get the formant values at the midpoint
		select Formant 'soundname$'
		f_one = Get value at time... 1 'midpoint' Hertz Linear
		f_two = Get value at time... 2 'midpoint' Hertz Linear
		f_three = Get value at time... 3 'midpoint' Hertz Linear
		resultline$ = "'soundname$''tab$''label$''tab$''f_one''tab$''f_two''tab$''f_three''tab$'"
		fileappend "'textfile$'" 'resultline$'
	endif
endfor

fileappend "'textfile$'" 'newline$'

	
endfor

# clean up

select all
Remove