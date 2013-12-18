Team-Project-3
==============

Repository for the 3rd year team project for team H.

Importing the Project
---------------------
To import the project clone the repo, then add the Evacuation-Simulation-Project folder in Unity3D.
Unity will then build the project files and import everything.
In the Unity Settings make sure that the meta files are being created for version control.
To do this go to <code>Edit->Project Settings->Editor</code> then in the options that appear on the screen(usually on the right) set Version Control Mode to <code>Meta files</code>

Documentation
-------------
The report for our project is in the <code>Documentation->Dissertation</code> folder. The files initially put in there were taken from the Moodle site and was the LaTeX template provided.
Any other files/articles/docs we have are in the <code>Documentation->Resources</code> folder.

Adding to the project
---------------------
Inside the project folder, all of our scripts should go in the <code>Evacuation-Simulation-Project->Assets->Scripts</code> folder. All the models (such as the plane or human) are in the <code>Evacuation-Simulation-Project->Assets->Models</code> folder.
All the files that make the folder incredibly large should not be uploaded to github (the .gitignore file makes sure this doesn't happen) however if unnecessary asset packages are added then it can also make the Assets folder quite large. At the beginning I only put a few assets in, if you need more you can add it to the project by going to <code>Assets->Import Package</code>



**Everyone will need to add their models/scripts/scenes to the repo to begin with.
We will need to keep in mind that with binary files like the scenes cannot be merged in git, so if two people alter a scene, only one of them can be used. So we need to coordinate/inform when someone is altering the scene. Once it is originally setup though, we shouldn't need to alter it a lot
<br>
Also the folders are still quite large in size, so doing huge changes can take longer to upload to github than when we were doing things like the PSD3 Sprints**
