# This script goes through sound and TextGrid files in a directory,
# opens each pair of Sound and TextGrid, calculates the pitch maximum
# of each labeled interval, and saves results to a text file.
# To make some other or additional analyses, you can modify the script
# yourself... it should be reasonably well commented! ;)
#
# This script is distributed under the GNU General Public License.
# Copyright 4.7.2003 Mietta Lennes
## Modified by Sunwoo Jeong on 190925 for ExpLing2019 lab assignment 1


form Analyze pitch maxima from labeled segments in files
	comment Directory of sound files
	## SJ: changed directory path, tier names, and pitch analysis parameters
	text sound_directory ./files-to-analyze/
	sentence Sound_file_extension .wav
	comment Directory of TextGrid files
	text textGrid_directory ./files-to-analyze/
	sentence TextGrid_file_extension .TextGrid
	comment Full path of the resulting text file:
	text resultfile ./pitchresults-demo1.txt
	comment Which tier do you want to analyze?
	sentence Tier phoneme
	comment Pitch analysis parameters
	positive Time_step 0.01
	positive Minimum_pitch_(Hz) 45
	positive Maximum_pitch_(Hz) 450
endform

# Here, you make a listing of all the sound files in a directory.
# The example gets file names ending with ".wav" from ./files-to-analyze/

Create Strings as file list... list 'sound_directory$'*'sound_file_extension$'
numberOfFiles = Get number of strings

# Check if the result file exists:
if fileReadable (resultfile$)
	pause The result file 'resultfile$' already exists! Do you want to overwrite it?
	filedelete 'resultfile$'
endif

# Write a row with column titles to the result file:
# (remember to edit this if you add or change the analyses!)

## SJ: added MinF0, MidF0, StartF0, and endF0
titleline$ = "Filename 'tab$' Segment 'tab$' Duration 'tab$' MaxF0 'tab$' MinF0 'tab$' MidF0 'tab$' StartF0 'tab$' endF0 'newline$'"
fileappend "'resultfile$'" 'titleline$'

# Go through all the sound files, one by one:

for ifile to numberOfFiles
	filename$ = Get string... ifile
	# A sound file is opened from the listing:
	Read from file... 'sound_directory$''filename$'
	# Starting from here, you can add everything that should be 
	# repeated for every sound file that was opened:
	soundname$ = selected$ ("Sound", 1)
	To Pitch... time_step minimum_pitch maximum_pitch
	# Open a TextGrid by the same name:
	gridfile$ = "'textGrid_directory$''soundname$''textGrid_file_extension$'"
	if fileReadable (gridfile$)
		Read from file... 'gridfile$'
		# Find the tier number that has the label given in the form:
		call GetTier 'tier$' tier
		numberOfIntervals = Get number of intervals... tier
		# Pass through all intervals in the selected tier:
		for interval to numberOfIntervals
			label$ = Get label of interval... tier interval
			if label$ <> ""

				# if the interval has an unempty label, get its start and end:
				start = Get starting point... tier interval
				end = Get end point... tier interval
				
				## SJ: added
				# also get its midpoint:
				midpoint = start + ((end - start) / 2)
				# and its duration
				duration = end - start

				
				# select pitch object to perform measurements on
				select Pitch 'soundname$'

				# get the Pitch maximum of a given interval
				pitchmax = Get maximum... start end Hertz Parabolic
				printline 'pitchmax'
				
				## SJ: added
				# get the Pitch minimum of a given interval
				pitchmin = Get minimum... start end Hertz Parabolic
				printline 'pitchmin'
				
				## SJ: added
				# get the Pitch value at the midpoint of an interval
				pitchmid = Get value at time... 'midpoint' Hertz Linear
				printline 'pitchmid'
				
				## SJ: added
				# get the Pitch value at the start of an interval
				pitchonset = Get value at time... 'start' Hertz Linear
				printline 'pitchonset'

				## SJ: added
				# get the Pitch value at the end of an interval
				pitchoffset = Get value at time... 'end' Hertz Linear
				printline 'pitchoffset'

				# Save result to text file:
				## SJ: included additional measurement variables accordingly
				resultline$ = "'soundname$' 'tab$' 'label$' 'tab$' 'duration' 'tab$' 'pitchmax' 'tab$' 'pitchmin' 'tab$' 'pitchmid' 'tab$' 'pitchonset' 'tab$' 'pitchoffset' 'newline$'"
				fileappend "'resultfile$'" 'resultline$'
				select TextGrid 'soundname$'
			endif
		endfor
		# Remove the TextGrid object from the object list
		select TextGrid 'soundname$'
		Remove
	endif
	# Remove the temporary objects from the object list
	select Sound 'soundname$'
	plus Pitch 'soundname$'
	Remove
	select Strings list
	# and go on with the next sound file!
endfor

Remove


#-------------
# This procedure finds the number of a tier that has a given label.

procedure GetTier name$ variable$
        numberOfTiers = Get number of tiers
        itier = 1
        repeat
                tier$ = Get tier name... itier
                itier = itier + 1
        until tier$ = name$ or itier > numberOfTiers
        if tier$ <> name$
                'variable$' = 0
        else
                'variable$' = itier - 1
        endif

	if 'variable$' = 0
		exit The tier called 'name$' is missing from the file 'soundname$'!
	endif

endproc
