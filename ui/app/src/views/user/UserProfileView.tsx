// Copyright 2024 The Perses Authors
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { ReactElement } from 'react';
import { Stack, Typography } from '@mui/material';
import { useAuthToken } from '../../model/auth-client';
import { useUserPermissions } from '../../model/user-client';

function UserProfileView(): ReactElement {
  const { data: decodedToken } = useAuthToken();
  const username = decodedToken?.sub;
  const { data: permissions, isLoading, error } = useUserPermissions(username || '');

  return (
    <Stack m={2}>
      <Typography variant="h1">User Profile Page</Typography>
      {username && <Typography variant="h6">User: {username}</Typography>}

      <Typography variant="h2" mt={4}>Permissions</Typography>
      {isLoading && <Typography>Loading permissions...</Typography>}
      {error && <Typography color="error">Error loading permissions: {error.message}</Typography>}
      {permissions && (
        <Stack component="ul" sx={{ listStyle: 'disc', pl: 2 }}>
          {Object.entries(permissions).map(([scope, perms]) => (
            <li key={scope}>
              <Typography>
                <strong>{scope}:</strong> {perms.map(p => p.action).join(', ')}
              </Typography>
            </li>
          ))}
        </Stack>
      )}

      {/* TODO: Add sections for theme, keyboard shortcuts, search bar config, table config */}
    </Stack>
  );
}

export default UserProfileView; 