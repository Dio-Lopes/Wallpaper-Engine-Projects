
// [COMBO] {"material":"ui_editor_properties_blend_mode","combo":"BLENDMODE","type":"imageblending","default":9}

#include "common_blending.h"

varying vec4 v_TexCoord;
varying vec2 v_ReflectedCoord;

uniform sampler2D g_Texture0; // {"hidden":true}
uniform sampler2D g_Texture1; // {"label":"ui_editor_properties_opacity_mask","mode":"opacitymask","combo":"MASK","paintdefaultcolor":"0 0 0 1"}

uniform float g_ReflectionAlpha; // {"material":"alpha","label":"ui_editor_properties_alpha","default":1.0,"range":[0.0, 1]}

void main() {
	vec4 albedo = texSample2D(g_Texture0, v_TexCoord.xy);
	vec4 reflected = texSample2D(g_Texture0, v_ReflectedCoord);
	
#if MASK
	float mask = texSample2D(g_Texture1, v_TexCoord.zw).r;
#else
	float mask = 1.0;
#endif
	
	//gl_FragColor = mix(mix(albedo, reflected, mask), albedo + reflected * mask, g_Additive);
	gl_FragColor.rgb = ApplyBlending(BLENDMODE, albedo.rgb, reflected.rgb, mask * g_ReflectionAlpha);
	gl_FragColor.a = min(1.0, albedo.a + reflected.a * mask * g_ReflectionAlpha);
}
