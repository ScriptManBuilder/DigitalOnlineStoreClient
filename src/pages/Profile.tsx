import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  max-width: 800px;
  margin: 80px auto;
  padding: 2rem;
  min-height: calc(100vh - 200px);
`;

const ProfileCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e0e0e0;
`;

const Avatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: white;
  font-weight: bold;
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const ProfileName = styled.h1`
  font-size: 2rem;
  margin: 0 0 0.5rem 0;
  color: #333;
`;

const ProfileEmail = styled.p`
  color: #666;
  margin: 0;
  font-size: 1rem;
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: #333;
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #667eea;
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #667eea;
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;

  ${props => props.variant === 'primary' ? `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }

    &:disabled {
      background: #ccc;
      cursor: not-allowed;
      transform: none;
    }
  ` : `
    background: white;
    color: #333;
    border: 1px solid #ddd;

    &:hover {
      background: #f5f5f5;
    }

    &:disabled {
      background: #f5f5f5;
      cursor: not-allowed;
    }
  `}
`;

const Message = styled.div<{ type: 'success' | 'error' }>`
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  background: ${props => props.type === 'success' ? '#d4edda' : '#f8d7da'};
  color: ${props => props.type === 'success' ? '#155724' : '#721c24'};
  border: 1px solid ${props => props.type === 'success' ? '#c3e6cb' : '#f5c6cb'};
`;

const InfoText = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

function Profile() {
  const { user, isAuthenticated, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  const [description, setDescription] = useState('');

  useEffect(() => {
    // Если нет user (даже если есть admin) - редирект на главную
    if (!user) {
      navigate('/');
      return;
    }

    // Обновляем description когда user загружается или меняется description
    setDescription(user.description || '');
  }, [user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isEditing) {
      return;
    }
    
    setIsLoading(true);
    setMessage(null);

    try {
      await updateProfile({
        description: description,
      });
      
      setMessage({ type: 'success', text: '✓ Profile updated successfully!' });
      setIsEditing(false);
    } catch (error: any) {
      setMessage({ 
        type: 'error', 
        text: error.message || '❌ Failed to update profile. Please try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      setDescription(user.description || '');
    }
    setIsEditing(false);
    setMessage(null);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsEditing(true);
    setMessage(null);
  };

  if (!user) {
    return null;
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <ProfileContainer>
      <ProfileCard>
        <ProfileHeader>
          <Avatar>{getInitials(user.name)}</Avatar>
          <ProfileInfo>
            <ProfileName>{user.name}</ProfileName>
            <ProfileEmail>{user.email}</ProfileEmail>
          </ProfileInfo>
        </ProfileHeader>

        {message && (
          <Message type={message.type}>
            {message.text}
          </Message>
        )}

        <Section>
          <SectionTitle>Profile Information</SectionTitle>
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Label>Email</Label>
              <Input 
                type="email" 
                value={user.email} 
                disabled 
              />
              <InfoText>Email cannot be changed</InfoText>
            </InputGroup>

            <InputGroup>
              <Label>Name</Label>
              <Input 
                type="text"
                value={user.name}
                disabled
              />
              <InfoText>Name cannot be changed</InfoText>
            </InputGroup>

            <InputGroup>
              <Label>Description</Label>
              <TextArea 
                name="description"
                value={description}
                onChange={handleChange}
                disabled={!isEditing || isLoading}
                placeholder="Tell us about yourself..."
              />
            </InputGroup>

            <ButtonGroup>
              {!isEditing ? (
                <Button 
                  type="button" 
                  variant="primary"
                  onClick={handleEditClick}
                >
                  Edit Profile
                </Button>
              ) : (
                <>
                  <Button 
                    type="submit" 
                    variant="primary"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="secondary"
                    onClick={handleCancel}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                </>
              )}
            </ButtonGroup>
          </Form>
        </Section>

        {user.createdAt && (
          <InfoText>
            Member since: {new Date(user.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </InfoText>
        )}
      </ProfileCard>
    </ProfileContainer>
  );
}

export default Profile;
