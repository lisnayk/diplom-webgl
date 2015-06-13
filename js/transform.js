function getRotationPar(center, vector, t) {
    var result = new Array();

    var u_u = vector[0] * vector[0];
    var v_v = vector[1] * vector[1];
    var w_w = vector[2] * vector[2]; 

    var v_v_p_w_w = (v_v + w_w);
    var u_u_p_w_w = (u_u + w_w);
    var u_u_p_v_v = (u_u + v_v);

    var b_v_p_c_w = center[1] * vector[1] + center[2] * vector[2];
    var a_u_p_c_w = center[0] * vector[0] + center[2] * vector[2];
    var a_u_p_b_v = center[0] * vector[0] + center[1] * vector[1];
    var b_w_m_c_v = center[1] * vector[2] - center[2] * vector[1];
    var c_u_m_a_w = center[2] * vector[0] - center[0] * vector[2];
    var a_v_m_b_u = center[0] * vector[1] - center[1] * vector[0];

    var den = v_v+u_u+w_w;

    result[0] = den;

    result[1] = v_v_p_w_w;
    result[2] = u_u_p_w_w;
    result[3] = u_u_p_v_v;

    result[4] = center[0] * v_v_p_w_w;
    result[5] = center[1] * u_u_p_w_w;
    result[6] = center[2] * u_u_p_v_v;

    result[7] = b_v_p_c_w;
    result[8] = a_u_p_c_w;
    result[9] = a_u_p_b_v;

    result[10] = Math.cos(t);

    result[11] = Math.sin(t) * Math.sqrt(den);

    result[12] = b_w_m_c_v;
    result[13] = c_u_m_a_w;
    result[14] = a_v_m_b_u;

    result[15] = center[0];
    result[16] = center[1];
    result[17] = center[2];
    result[18] = vector[0];
    result[19] = vector[1];
    result[20] = vector[2];

    return result;
}

function rotate(p, point) {
    var p_20_p_2 = p[20] * point[2];
    var p_19_p_1 = p[19] * point[1];
    var p_18_p_0 = p[18] * point[0];
    var u_x_p_v_y_p_w_z = p_18_p_0 + p_19_p_1 + p_20_p_2;
    
    var temp0 = point[0];
    var temp1 = point[1];

    point[0] = (p[4]+p[18]*(-p[7]+u_x_p_v_y_p_w_z)+((temp0-p[15])*p[1]+p[18]*(p[7]-p_19_p_1-p_20_p_2))*p[10]+p[11]*(p[12]-p[20]*temp1+p[19]*point[2]))/p[0];
    point[1] = (p[5]+p[19]*(-p[8]+u_x_p_v_y_p_w_z)+((temp1-p[16])*p[2]+p[19]*(p[8]-p_18_p_0-p_20_p_2))*p[10]+p[11]*(p[13]+p[20]*temp0-p[18]*point[2]))/p[0];
    point[2] = (p[6]+p[20]*(-p[9]+u_x_p_v_y_p_w_z)+((point[2]-p[17])*p[3]+p[20]*(p[9]-p_18_p_0-p_19_p_1))*p[10]+p[11]*(p[14]-p[19]*temp0+p[18]*temp1))/p[0];
}

function translate(vector, point) {
    point[0] = point[0] + vector[0];
    point[1] = point[1] + vector[1];
    point[2] = point[2] + vector[2];
}

function scale(vector, point) {
    point[0] = point[0] * vector[0];
    point[1] = point[1] * vector[1];
    point[2] = point[2] * vector[2];
}

function translateObj(vector, obj) {
    translate(vector, obj.center);

    for (var i = 0; i < obj.points_number; i++) {
        translate(vector, obj.points[i]);
    }
}

function scaleObj(vector, obj) {
    var center = obj.center;
    var a = [-obj.center[0], -obj.center[1], -obj.center[2]];
    translateObj(a, obj);
    for (var i = 0; i < obj.points_number; i++) {
        scale(vector, obj.points[i]);
    }
    translateObj(center, obj);
}

function rotateObj(parametri1, parametri2, obj) {
    rotate(parametri1, obj.center);
    rotate(parametri2, obj.axis_x);
    rotate(parametri2, obj.axis_y);
    rotate(parametri2, obj.axis_z);
    
    for (var i = 0; i < obj.faces_number; i++) {
        rotate(parametri2, obj.normals[i]);
    }

    for (var j = 0; j < obj.points_number; j++) {
        rotate(parametri1, obj.points[j]);
    }
}

function project(distance, point, x, y) {
    var result = new Array();

    result[0] = point[0] * distance / point[2] + x;
    result[1] = y - point[1] * distance / point[2];
    result[2] = distance;

    return result;
}