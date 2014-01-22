function Update () {

if (Input.GetKey(KeyCode.UpArrow)) transform.Translate(Vector3.forward * Time.deltaTime * 10);

if (Input.GetKey(KeyCode.DownArrow)) transform.Translate(Vector3.back * Time.deltaTime * 10);

if (Input.GetKey(KeyCode.LeftArrow)) transform.Translate(Vector3.left * Time.deltaTime * 10);

if (Input.GetKey(KeyCode.RightArrow)) transform.Translate(Vector3.right * Time.deltaTime * 10);

if (Input.GetKey(KeyCode.LeftShift)) transform.Translate(Vector3.up * Time.deltaTime * 10);

if (Input.GetKey(KeyCode.LeftControl)) transform.Translate(Vector3.down * Time.deltaTime * 10);

if (Input.GetKey(KeyCode.A)) transform.Rotate(0, 1, 0);

if (Input.GetKey(KeyCode.D)) transform.Rotate(0, -1, 0);

if (Input.GetKey(KeyCode.W)) transform.Rotate(1, 0, 0);

if (Input.GetKey(KeyCode.S)) transform.Rotate(-1, 0, 0);

if (Input.GetKey(KeyCode.Q)) transform.Rotate(0, 0, 1);

if (Input.GetKey(KeyCode.E)) transform.Rotate(0, 0, -1);
}