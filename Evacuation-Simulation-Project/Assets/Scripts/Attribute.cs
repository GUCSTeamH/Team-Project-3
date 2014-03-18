using UnityEngine;
using System.Collections;
using RAIN.Core;
using RAIN.Action;

public class Attribute : MonoBehaviour {
	public string type;

	public int monteCarlo(int min, int max){
		return (Random.Range(min, max));
	}
	
	/* Types - Altruism, Behavioural-Inaction, Panic, Fear-Flight */ 
	public void setType(){
		RAINAgent ai = GetComponent<RAINAgent>();
		if (ai!=null){
			int random = monteCarlo(0, 100);
			
			if (random < 10){
				ai.Agent.actionContext.SetContextItem<string>("type", "altruism");
				type = "altruism";
				this.gameObject.transform.Find("Sphere").renderer.material.color = Color.yellow;
				Debug.Log("Altruism");
			}
			else if (random < 50){
				type = "behai=viouralinaction";
				ai.Agent.actionContext.SetContextItem<string>("type", "behaviouralinaction");
			}
			else if (random < 75){
				type = "fearflight";
				ai.Agent.actionContext.SetContextItem<string>("type", "fearflight");
				//this.gameObject.transform.Find("Sphere").renderer.material.color = Color.red;
			}
			else{
				type = "panic";
				ai.Agent.actionContext.SetContextItem<string>("type", "panic");
				this.gameObject.transform.Find("Sphere").renderer.material.color = Color.red;
				this.renderer.material.color = Color.red; 
			}
		}
	}

	// Use this for initialization
	void Start () {
		setType();
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
