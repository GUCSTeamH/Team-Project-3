

var minX : int = 0; // min spawn range
var prefab : GameObject;

var maxX : int = 7; // maxspawn range

var minY: int = 0;

var maxY: int = 25;

var randomPos :Vector3; // random position genearted

var checkposition:Vector3;  // used to check wether the position is already in the array

var place:boolean = true; // can the object be placed?

var objectPosition = new Array(); // array that contains used  up positions

var spacing = 2.0; 

function Start ()

    {

       

        // create an Object for each level

        for (var a = 0; a < 5; a++)

            {

                // create a randomposition

                randomPos = Vector3(Random.Range(minX,maxX),0,Random.Range(minY,maxY));

                //start searchig for values in the array

                place = true;

               

                for ( checkposition in objectPosition)

                    {

                        //if the value is not inside the array

                        if ( checkposition == randomPos)

                            {

                                place = false;

                            }

                    }

       

                if (place == true)

                    {

                        //spawn an object

                        prefab=Instantiate(prefab, randomPos, Quaternion.identn);

                        objectPosition.Add(randomPos);

                    }

            }

    }