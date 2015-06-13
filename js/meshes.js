// get random color
function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}

// prepare object
function prepareObject(o) {
    o.colors = new Array();

    // prepare normals
    o.normals = new Array();
    for (var i = 0; i < o.faces.length; i++) {
        o.normals[i] = [0, 0, 0];

        o.colors[i] = getRandomColor();
    }

    // prepare centers: calculate max positions
    o.center = [0, 0, 0];
    for (var i = 0; i < o.points.length; i++) {
        o.center[0] += o.points[i][0];
        o.center[1] += o.points[i][1];
        o.center[2] += o.points[i][2];
    }

    // prepare distances
    o.distances = new Array();
    for (var i = 1; i < o.points.length; i++) {
        o.distances[i] = 0;
    }

    // calculate average center positions
    o.points_number = o.points.length;
    o.center[0] = o.center[0] / (o.points_number - 1);
    o.center[1] = o.center[1] / (o.points_number - 1);
    o.center[2] = o.center[2] / (o.points_number - 1);

    o.faces_number = o.faces.length;
    o.axis_x = [1, 0, 0];
    o.axis_y = [0, 1, 0];
    o.axis_z = [0, 0, 1];
}

// Cube object
function cube() {

    // prepare points and faces for cube
    this.points= APP.Data.points;/*[
        [0,0,0],
        [100,0,0],
        [100,100,0],
        [0,100,0],
        [0,0,100],
        [100,0,100],
        [100,100,100],
        [0,100,100],
        [50,50,100],
        [50,50,0],
    ];*/

    this.faces=APP.Data.faces; /*[
        [0,4,5],
        [0,5,1],
        [1,5,6],
        [1,6,2],
        [2,6,7],
        [2,7,3],
        [3,7,4],
        [3,4,0],
        [8,5,4],
        [8,6,5],
        [8,7,6],
        [8,4,7],
        [9,5,4],
        [9,6,5],
        [9,7,6],
        [9,4,7],
    ];
 */
    prepareObject(this);
}

// Sphere object
function sphere(n) {
    var delta_angle = 2 * Math.PI / n;

    // prepare vertices (points) of sphere
    var vertices = [];
    for (var j = 0; j < n / 2 - 1; j++) {
        for (var i = 0; i < n; i++) {
            vertices[j * n + i] = [];
            vertices[j * n + i][0] = 100 * Math.sin((j + 1) * delta_angle) * Math.cos(i * delta_angle);
            vertices[j * n + i][1] = 100 * Math.cos((j + 1) * delta_angle);
            vertices[j * n + i][2] = 100 * Math.sin((j + 1) * delta_angle) * Math.sin(i * delta_angle);
        }
    }
    vertices[(n / 2 - 1) * n] = [];
    vertices[(n / 2 - 1) * n + 1] = [];

    vertices[(n / 2 - 1) * n][0] = 0;
    vertices[(n / 2 - 1) * n][1] =  100;
    vertices[(n / 2 - 1) * n][2] =  0;

    vertices[(n / 2 - 1) * n + 1][0] = 0;
    vertices[(n / 2 - 1) * n + 1][1] = -100;
    vertices[(n / 2 - 1) * n + 1][2] = 0;

    this.points = vertices;

    // prepare faces
    var faces = [];
    for (var j = 0; j < n / 2 - 2; j++) {
        for (var i = 0; i < n - 1; i++) {
            faces[j * 2 * n + i] = [];
            faces[j * 2 * n + i + n] = [];

            faces[j * 2 * n + i][0] = j * n + i;
            faces[j * 2 * n + i][1] = j * n + i + 1;
            faces[j * 2 * n + i][2] = (j + 1) * n + i + 1;
            faces[j * 2 * n + i + n][0] = j * n + i;
            faces[j * 2 * n + i + n][1] = (j + 1) * n + i + 1;
            faces[j * 2 * n + i + n][2] = (j + 1) * n + i;
        }

        faces[j * 2 * n + n - 1] = [];
        faces[2 * n * (j + 1) - 1] = [];

        faces[j * 2 * n + n - 1  ][0] = (j + 1) * n - 1;
        faces[j * 2 * n + n - 1  ][1] = (j + 1) * n;
        faces[j * 2 * n + n - 1  ][2] = j * n;
        faces[2 * n * (j + 1) - 1][0] = (j + 1) * n - 1;
        faces[2 * n * (j + 1) - 1][1] = j * n + n;
        faces[2 * n * (j + 1) - 1][2] = (j + 2) * n - 1;
    }
    for (var i = 0; i < n - 1; i++) {
        faces[n * (n - 4) + i] = [];
        faces[n * (n - 3) + i] = [];

        faces[n * (n - 4) + i][0] = (n / 2 - 1) * n;
        faces[n * (n - 4) + i][1] = i;
        faces[n * (n - 4) + i][2] = i + 1;
        faces[n * (n - 3) + i][0] = (n / 2 - 1) * n + 1;
        faces[n * (n - 3) + i][1] = (n / 2 - 2) * n + i + 1;
        faces[n * (n - 3) + i][2] = (n / 2 - 2) * n + i;
    }

    faces[n * (n - 3) - 1] = [];
    faces[n * (n - 2) - 1] = [];

    faces[n * (n - 3) - 1][0] = (n / 2 - 1) * n;
    faces[n * (n - 3) - 1][1] = n - 1;
    faces[n * (n - 3) - 1][2] = 0;
    faces[n * (n - 2) - 1][0] = (n / 2 - 1) * n + 1;
    faces[n * (n - 2) - 1][1] = (n / 2 - 2) * n;
    faces[n * (n - 2) - 1][2] = (n / 2 - 2) * n + n - 1;

    this.faces=faces;

    prepareObject(this);
}