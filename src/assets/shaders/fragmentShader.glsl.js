const fragmentShader = `
    uniform sampler2D globeTexture;
    varying vec2 vertexUV; //vec 2 (0,0.24)
    varying vec3 vertexNormal;

    void main() {
        float intensity = 1.00 - dot(vertexNormal, vec3(0.0,0.0,1.0));
        vec3 atmosphere = vec3(0.5, 0.6, 0.9) * pow(intensity, 1.0);

        gl_FragColor = vec4(atmosphere + texture2D(globeTexture, vertexUV).xyz,1.0);
    }
`;

export default fragmentShader;
