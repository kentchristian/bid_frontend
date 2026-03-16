import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';

const AuthCard = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <div className="min-h-screen bg-[color:var(--app-bg)] px-4 py-10 flex items-center justify-center">
      <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-[color:var(--card-border)] bg-[color:var(--card)] shadow-2xl grid grid-cols-1 md:grid-cols-[1.05fr_1fr]">
        <div
          className="auth-hero relative isolate overflow-hidden px-8 py-10 text-white"
          style={{
            backgroundImage:
              "linear-gradient(145deg, rgba(114, 120, 128, 0.92) 0%, rgba(114, 120, 128, 0.65) 32%, rgba(188, 188, 181, 0.28) 58%, rgba(42, 44, 48, 0.94) 100%), url(/bg-image-login.svg)",
            backgroundBlendMode: 'multiply',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute -left-24 top-10 h-48 w-48 rounded-full bg-[#bcbcb5]/20 blur-3xl" />
          <div className="absolute -right-20 bottom-0 h-56 w-56 rounded-[48px] bg-[#727880]/30 blur-3xl" />

          <p className="text-xs uppercase tracking-[0.35em] text-white/70">
            BIM
          </p>

          <div className="flex flex-col justify-center items-center">
            <img src="/logo.svg" alt="BID logo" className="h-80" />

            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-white/70">
                Built for clarity
              </p>
              <h2 className="mt-2 text-3xl font-semibold leading-tight">
                Turn metrics into confident decisions.
              </h2>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center px-6 py-10">
          <div className="w-full max-w-sm">
            <header className="mb-6 text-center">
              <Typography
                variant="h3"
                className="text-2xl font-bold text-[color:var(--main-text)]"
              >
                {title}
              </Typography>
            </header>

            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthCard;
