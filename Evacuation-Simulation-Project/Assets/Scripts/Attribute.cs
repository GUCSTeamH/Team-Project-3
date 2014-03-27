/*
 * script that assigns a particulat behaviour type to a passenger
 * 
 * script uses RAIN{Indie} plugin, found at : http://rivaltheory.com/rain/
 */ 

using UnityEngine;
using System.Collections;
using RAIN.Core;
using RAIN.Action;

public class Attribute : MonoBehaviour {
	private string type;
	private bool overFifty, gender;

	/* Returns random number in range 0-100 */
	public int monteCarlo(){
		return (Random.Range(0, 100));
	}
	
	/* Types - Altruism, Behavioural-Inaction, Panic, Fear-Flight 
	 * Also set colour according to the behaviour type
	 */ 
	public void setType(RAINAgent ai){

		if (ai!=null){
			int random = monteCarlo();

			if (random < 20){
				ai.Agent.actionContext.SetContextItem<string>("type", "altruism");
				type = "altruism";
				this.gameObject.transform.Find("Sphere").renderer.material.color = Color.green;
			}
			else if (random < 45){
				type = "behaviouralinaction";
				ai.Agent.actionContext.SetContextItem<string>("type", "behaviouralinaction");
				this.gameObject.transform.Find("Sphere").renderer.material.color = Color.yellow;
			}
			else if (random < 50){
				type = "panic";
				ai.Agent.actionContext.SetContextItem<string>("type", "panic");
				this.gameObject.transform.Find("Sphere").renderer.material.color = Color.red;
			}
			else{
				type = "fearflight";
				ai.Agent.actionContext.SetContextItem<string>("type", "fearflight");
				this.gameObject.transform.Find("Sphere").renderer.material.color = Color.gray;
			}
		}
	}


	/* create a random position for the panic passenger to move to before moving to its
	 * closest door 
	 */
	public void setPanicPosition(RAINAgent ai){
		Vector3 currPos = this.gameObject.transform.position;
		float z = Random.Range(currPos.z - 10, currPos.z + 10);
		Vector3 newPos = new Vector3((float)17, (float)8, z);
		ai.Agent.actionContext.SetContextItem<Vector3>("newpos", newPos);
	}

	/* Make them wait at the start before evacuation begins */
	IEnumerator Wait(RAINAgent ai){

		//set the value corresponding to coroutines to be true, so the passenger does not
		//enter another coroutine before exiting the present one
		ai.Agent.actionContext.SetContextItem<bool>("runningCoroutine", true);

		float x= ai.maxSpeed;
		float mass = this.gameObject.rigidbody.mass;
		int time = 0;

		//modify waiting times and masses according to behaviour type
		if (type == "panic"){
			time = Random.Range(5, 10);
			this.gameObject.rigidbody.mass = 30;
		}
		else if (type == "fearflight" || type == "altruism"){
			time = Random.Range(10, 15);
			this.gameObject.rigidbody.mass = 20;
		}
		else if (type == "behaviouralinaction"){
			time = Random.Range(15, 25);
			this.gameObject.rigidbody.mass = 50;
		}

		if (ai!=null){
			ai.maxSpeed = 0;
		}
		// suspend the execution of the coroutine for the specified amount of time
		yield return new WaitForSeconds(time);

		//return speed and mass to original values
		ai.maxSpeed = x;
		this.gameObject.rigidbody.mass=mass;

		//register exit from coroutine
		ai.Agent.actionContext.SetContextItem<bool>("runningCoroutine", false);

	}

	// start the assignment of behaviours
	void StartBeh () {

		//get the agent
		RAINAgent ai = GetComponent<RAINAgent>();
	
		//assign type
		setType(ai);

		//set coroutine variable
		ai.Agent.actionContext.SetContextItem<bool>("runningCoroutine", false);


		//according to behaviour type, add script or start coroutines
		if (type == "panic"){
			StartCoroutine(Wait(ai));
			setPanicPosition(ai);
		}
		else if (type == "fearflight" || type == "behaviouralinaction"){
			StartCoroutine(Wait(ai));
		}
		else if(type == "altruism"){
			StartCoroutine (Wait (ai));
			this.gameObject.AddComponent("trigPass");
		}
	}


	//set behaviours manually, including colour and variable in the action context
	public void setTypeManual(RAINAgent ai){
		
		if (ai!=null){
			if (type == "altruism"){
				ai.Agent.actionContext.SetContextItem<string>("type", "altruism");
				this.gameObject.transform.Find("Sphere").renderer.material.color = Color.green;
			}
			else if (type == "behaviouralinaction"){
				ai.Agent.actionContext.SetContextItem<string>("type", "behaviouralinaction");
				this.gameObject.transform.Find("Sphere").renderer.material.color = Color.yellow;
			}
			else if (type == "panic"){
				ai.Agent.actionContext.SetContextItem<string>("type", "panic");
				this.gameObject.transform.Find("Sphere").renderer.material.color = Color.red;
			}
			else {
				ai.Agent.actionContext.SetContextItem<string>("type", "fearflight");
				this.gameObject.transform.Find("Sphere").renderer.material.color = Color.gray;
			}
		}
	}

	//method used for assigning behaviours in custom simulations
	void StartBehManual () {
		RAINAgent ai = GetComponent<RAINAgent>();

		setTypeManual(ai);
		
		if (type == "panic"){
			StartCoroutine(Wait(ai));
			setPanicPosition(ai);
		}
		else if (type == "fearflight" || type == "behaviouralinaction"){
			StartCoroutine(Wait(ai));
		}
		else if(type == "altruism"){
			this.gameObject.AddComponent("trigPass");
		}
	}

	//method used for assigning a behaviour type in custom simulations
	void SetTypeManual(string type){
		this.type = type;
	}
}
