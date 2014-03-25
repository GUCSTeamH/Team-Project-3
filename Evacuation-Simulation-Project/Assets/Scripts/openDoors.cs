/*
 *script that allows for a certain amount of time to pass before the doors open to let
 *passengers out
 * 
 */

using UnityEngine;
using System.Collections;

public class openDoors : MonoBehaviour {

	// start the coroutine
	void onStart () {
		StartCoroutine(Wait());
	}

	IEnumerator Wait(){
		//wait * seconds before continuing execution
		yield return new WaitForSeconds(17);

		//get all doors and add the "trig" script, which enables destruction of game objects
		//on collision
		GameObject[] exits = GameObject.FindGameObjectsWithTag("Exit");
		for (int i=0; i<exits.Length; i++){
			Debug.Log(exits[i].name);
			exits[i].AddComponent("trig");
		}
	}
	

}
