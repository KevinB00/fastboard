package utils;

import io.jsonwebtoken.Jwts;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtUtil {

    // Clave secreta para firmar los tokens
    @Value("${security.jwt.key.private}")
    private String claveSecreta;

    // Duración del token
    @Value("${security.jwt.key.expiration}")
    private long expiracion;

    /*
     * Generar un token JWT a partir del nombre del usuario
     * @param username nombre del usuario
     * @return token JWT
     */
    public String generateToken(String username) {
        return Jwts.builder()
    }
}
