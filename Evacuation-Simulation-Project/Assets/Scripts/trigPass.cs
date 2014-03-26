//script attached to the passengers that exhibit altruistic personality traits
//script makes use of the RAIN{Indie} plugin for Unity3D, found at : http://rivaltheory.com/rain/
using UnityEngine;
using System.Collections;
using RAIN.Core;
using RAIN.Action;

public class trigPass : MonoBehaviour {
	int i = 0;
	int limit = Random.Range(2, 8);
	bool runningCoroutine;

	//when another game object collides with this one, trigger an action
	void OnTriggerEnter (Collider other) {
		RAINAgent ai = GetComponent<RAINAgent>();
		RAINAgent otherAI = other.gameObject.GetComponent<RAINAgent>();

		//check if this passenger is already running a coroutine
		runningCoroutine = ai.Agent.actionContext.GetContextItem<bool>("runningCoroutine");
		if (runningCoroutine){
			return;
		}

		//if the other agent is not null, check if it is a passenger
		//if yes and a number smaller than 75 is generated, wait and give priority to other
		//passenger
		if (other.gameObject.name=="Passenger" && otherAI != null && i < limit){
				
			int random = Random.Range(0, 100);
				
			if (random < 75){
				StartCoroutine(Wait(ai));
				i++;
			}

		}

	}

	//coroutine that makes the passenger wait
	IEnumerator Wait(RAINAgent ai){
		ai.Agent.actionContext.SetContextItem<bool>("runningCoroutine", true);

		//remember the original speed and mass
		float x= ai.maxSpeed;
		float mass = this.gameObject.rigidbody.mass;
		int time = Random.Range(2, 8);

		//stop the passenger for time seconds
		if (ai != null){
			//print ("not null");
			ai.maxSpeed = 0;
			this.gameObject.rigidbody.mass = 50;
		}
		yield return new WaitForSeconds(time);

		//return original speed and mass
		ai.maxSpeed = x;
		this.gameObject.rigidbody.mass = mass;

		ai.Agent.actionContext.SetContextItem<bool>("runningCoroutine", false);
	}
}
