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

	/* Types - Altruism, Behavioural-Inaction, Panic, Fear-Flight */ 
	public void setType(RAINAgent ai){

		if (ai!=null){
			int random = monteCarlo();

			if (gender){
				if (overFifty){
					if (random < 20){
						ai.Agent.actionContext.SetContextItem<string>("type", "altruism");
						type = "altruism";
						this.gameObject.transform.Find("Sphere").renderer.material.color = Color.green;
					}
					else if (random < 50){
						type = "behaviouralinaction";
						ai.Agent.actionContext.SetContextItem<string>("type", "behaviouralinaction");
						this.gameObject.transform.Find("Sphere").renderer.material.color = Color.yellow;
					}
					else if (random < 55){
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
				else{
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
			else{
				if (overFifty){
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
				else{
					if (random < 10){
						ai.Agent.actionContext.SetContextItem<string>("type", "altruism");
						type = "altruism";
						this.gameObject.transform.Find("Sphere").renderer.material.color = Color.green;
					}
					else if (random < 30){
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
		}

	}

	void setPanicPosition(RAINAgent ai){
		Vector3 currPos = this.gameObject.transform.position;
		float z = Random.Range(currPos.z - 10, currPos.z + 10);
		Vector3 newPos = new Vector3((float)17, (float)8, z);
		ai.Agent.actionContext.SetContextItem<Vector3>("newpos", newPos);
	}

	/* Make them wait at the start before evacuation begins */
	IEnumerator Wait(RAINAgent ai){
		float x= ai.maxSpeed;
		float mass = this.gameObject.rigidbody.mass;
		int time = 0;
		Debug.Log("REACHED HERE");
		if (type == "panic"){
			time = Random.Range(5, 10);
			this.gameObject.rigidbody.mass = 30;
		}
		else if (type == "fearflight"){
			time = Random.Range(10, 15);
			this.gameObject.rigidbody.mass = 20;
		}
		else if (type == "behaviouralinaction"){
			time = Random.Range(15, 25);
			this.gameObject.rigidbody.mass = 50;
		}

		if (ai!=null){
			//print ("not null");
			ai.maxSpeed = 0;
		}
		//		yield WaitForSeconds(30);
		yield return new WaitForSeconds(time);
		ai.maxSpeed = x;
		this.gameObject.rigidbody.mass=mass;
	}

	// Use this for initialization
	void StartBeh () {
		RAINAgent ai = GetComponent<RAINAgent>();

		setAge(ai);
		setGender(ai);
		setType(ai);

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

	void StartBehManual () {
		RAINAgent ai = GetComponent<RAINAgent>();
		
		setAge(ai);
		setGender(ai);
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

	void SetTypeManual(string type){
		Debug.Log(type);
		this.type = type;
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
