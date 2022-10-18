const vertexShader = `
    varying vec3 vertexNormal;
    varying vec2 vertexUV;

    void main() {
        vertexUV = uv;
        vertexNormal = normalize(normalMatrix * normal);
        gl_Position =  projectionMatrix * modelViewMatrix *vec4(position,1);
    }
`;

export default vertexShader;
