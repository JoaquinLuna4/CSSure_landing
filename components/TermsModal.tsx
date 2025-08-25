'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function TermsModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Terms & Privacy Policy</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close terms"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="prose max-w-none">
            <h3>1. Acceptance of Terms</h3>
            <p>
              By accessing or using CSSure, you agree to be bound by these Terms of Service and our Privacy Policy.
            </p>

            <h3>2. Service Description</h3>
            <p>
              CSSure provides HTML validation and cleaning services for email templates. We reserve the right to modify or discontinue the service at any time.
            </p>

            <h3>3. Privacy Policy</h3>
            <p>
              We respect your privacy. Any email addresses collected through the waitlist will only be used to notify you about CSSure updates and will not be shared with third parties.
            </p>

            <h3>4. Early Access</h3>
            <p>
              Users who join the waitlist may receive early access to CSSure. Early access is provided "as is" and may be subject to additional terms.
            </p>

            <h3>5. Limitation of Liability</h3>
            <p>
              CSSure is provided without warranties of any kind. We are not responsible for any damages resulting from the use of our service.
            </p>
          </div>

          <div className="mt-6 flex justify-end">
            <Button 
              onClick={onClose}
              className="px-6"
              style={{ backgroundColor: "#21323B" }}
            >
              I Understand
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
