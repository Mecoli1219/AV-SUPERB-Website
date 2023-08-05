
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

type Props = {
    children: React.ReactElement;
};

/*
  add the requireAuth property to the page component
  to protect the page from unauthenticated users
  e.g.:
  OrderDetail.requireAuth = true;
  export default OrderDetail;
 */

export const ProtectedLayout = ({ children }: Props): JSX.Element => {
    const router = useRouter();
    const { data, status: sessionStatus } = useSession();
    const loading = sessionStatus === 'loading';
    const isAdmin = data?.isAdmin;

    useEffect(() => {
        // check if the session is loading or the router is not ready
        if (loading || !router.isReady) return;

        // if the user is not authorized, redirect to the login page
        // with a return url to the current page
        if (!isAdmin) {
            router.push({
                pathname: '/',
                query: { returnUrl: router.asPath },
            });
        }
    }, [loading, isAdmin, sessionStatus, router]);

    // if the user refreshed the page or somehow navigated to the protected page
    if (loading) {
        return <>Loading...</>;
    }

    // if the user is authorized, render the page
    // otherwise, render nothing while the router redirects him to the login page
    return isAdmin ? <div>{children} </div> : <></ >;
};
