# Created on 2019/9/24 by Sunwoo Jeong
# First create a manipulation object, stylize pitch, and select the object
# Plug in appropriate values below
range1 = 0.24
range2 = 0.28
starttime = 0.24
startpitch = 191
base$ = "georae"


selectObject ("Manipulation 'base$'")
do ("Extract pitch tier")
do ("Remove points between...", 'range1', 'range2')
do ("Add point...", 'starttime', 'startpitch'+10)
selectObject ("Manipulation georae")
plusObject ("PitchTier georae")
do ("Replace pitch tier")
selectObject ("Manipulation georae")
do ("Get resynthesis (overlap-add)")
do ("Scale intensity...", 68)
do ("Save as WAV file...", "./'base$'-up1.wav")

selectObject ("Manipulation 'base$'")
do ("Extract pitch tier")
do ("Remove points between...", 'range1', 'range2')
do ("Add point...", 'starttime', 'startpitch'+20)
selectObject ("Manipulation georae")
plusObject ("PitchTier georae")
do ("Replace pitch tier")
selectObject ("Manipulation georae")
do ("Get resynthesis (overlap-add)")
do ("Scale intensity...", 68)
do ("Save as WAV file...", "./'base$'-up2.wav")

selectObject ("Manipulation 'base$'")
do ("Extract pitch tier")
do ("Remove points between...", 'range1', 'range2')
do ("Add point...", 'starttime', 'startpitch'+30)
selectObject ("Manipulation georae")
plusObject ("PitchTier georae")
do ("Replace pitch tier")
selectObject ("Manipulation georae")
do ("Get resynthesis (overlap-add)")
do ("Scale intensity...", 68)
do ("Save as WAV file...", "./'base$'-up3.wav")

selectObject ("Manipulation 'base$'")
do ("Extract pitch tier")
do ("Remove points between...", 'range1', 'range2')
do ("Add point...", 'starttime', 'startpitch'+30)
selectObject ("Manipulation georae")
plusObject ("PitchTier georae")
do ("Replace pitch tier")
selectObject ("Manipulation georae")
do ("Get resynthesis (overlap-add)")
do ("Scale intensity...", 68)
do ("Save as WAV file...", "./'base$'-up4.wav")





