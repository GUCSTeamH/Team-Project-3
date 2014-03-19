using UnityEngine;
using System.Collections;
using RAIN.Core;
using RAIN.Action;

public class Attribute : MonoBehaviour {
	private string type;
	private bool overFifty, gender;
	private int dominance, reasoning, boldness, tension, ruleConscious, selfReliance;

	/* Returns random number in range 0-100 */
	public int monteCarlo(){
		return (Random.Range(0, 100));
	}

	/* According to ICAO standards for evacuation simulations */
	public void setAge(RAINAgent ai){
		int random = monteCarlo();

		if (random < 35){
			overFifty = true;
		}
		else{
			overFifty = false;
		}
		ai.Agent.actionContext.SetContextItem<bool>("overFifty", overFifty);
	}
	
	/* 1 for female, 0 for male */
	public void setGender(RAINAgent ai){
		int random;

		random = monteCarlo();
		if (random < 40){
			gender = true;
		}
		else{
			gender = false;
		}

		random = monteCarlo();
		if (overFifty){
			if (random < 15){
				gender = true;
			}
			else{
				gender = false;
			}
		}
		ai.Agent.actionContext.SetContextItem<bool>("gender", gender);
	}

	public void setAttributes(){
	
	}

	/* Types - Altruism, Behavioural-Inaction, Panic, Fear-Flight */ 
	public void setType(RAINAgent ai){
		if (ai!=null){
			int random = monteCarlo();
			
			if (random < 15){
				ai.Agent.actionContext.SetContextItem<string>("type", "altruism");
				type = "altruism";
				this.gameObject.transform.Find("Sphere").renderer.material.color = Color.green;
			}
			else if (random < 40){
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

	/* Make them wait at the start before evacuation begins */
	IEnumerator Wait(RAINAgent ai){
		float x= ai.maxSpeed;
		float mass = this.gameObject.rigidbody.mass;
		int time = 0;
		Debug.Log("REACHED HERE");
		if (type == "panic"){
			time = Random.Range(0, 5);
		}
		else if (type == "fearflight"){
			time = Random.Range(0, 10);
		}

		if (ai!=null){
			//print ("not null");
			ai.maxSpeed = 0;
			this.gameObject.rigidbody.mass=50;
		}
		//		yield WaitForSeconds(30);
		yield return new WaitForSeconds(time);
		ai.maxSpeed = x;
		this.gameObject.rigidbody.mass=mass;
	}

	// Use this for initialization
	void Start () {
		RAINAgent ai = GetComponent<RAINAgent>();

		setAge(ai);
		setGender(ai);
		setType(ai);

		if (type == "panic" || type == "fearflight"){
			StartCoroutine(Wait(ai));
		}
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
