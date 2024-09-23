import React, { ReactNode } from 'react';
import { useAccessTokenMonitor } from '../hooks/useAccessTokenMonitor'; // Assuming you have this hook available

interface ProviderProps {
    children: ReactNode;
    accessToken: any
    responseStatus: any;
    session: any
}

const CheckTokenProvider: React.FC<ProviderProps> = ({
    children,
    responseStatus,
    accessToken,
    session
}) => {

    // Call the hook to monitor the token
    const monitoredToken = useAccessTokenMonitor({ accessTokenCookie: accessToken, accessToken: session?.user.accessToken, session, responseStatus });

    return (
        <div>
            {children}
        </div>
    );
};

export default CheckTokenProvider;
