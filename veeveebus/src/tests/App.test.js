import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import Home from '../components/Home';
import About from '../components/About';
import Bus from '../components/Bus';


test('renders_App_with_Header_and_routing_links', () => {
  render(
      <App />
  );

  // Assert that the header title is present in the document
  const headerTitleElement = screen.getByText(/VeeVee Holidays/i);
  expect(headerTitleElement).toBeInTheDocument();
  
  // Assert that the routing links are present in the document
  const homeLinkElement = screen.getByText(/Home/i);
  const busLinkElement = screen.getByText(/Add Bus/i);
  const viewBusLinkElement = screen.getByText(/View Bus/i);

  expect(homeLinkElement).toBeInTheDocument();
  expect(busLinkElement).toBeInTheDocument();
  expect(viewBusLinkElement).toBeInTheDocument();
});

test('renders_Home_component_with_slogan', () => {
  render(<Home/>);

  // Assert that the initial slogan is present in the document
  const initialSloganElement = screen.getByText(/Your Perfect Holiday Destination/i);
  expect(initialSloganElement).toBeInTheDocument();
});

test('renders_Home_image_inside_div_carousel', () => {
  render(<Home />);

  // Assert that the image is present and has the correct alt text
  const carouselImage = screen.getByAltText('Carousel');
  expect(carouselImage).toBeInTheDocument();

  // Assert that the parent div of the image has the carousel class
  const carouselDiv = carouselImage.parentElement;
  expect(carouselDiv).toHaveClass('carousel');
});

test('renders_About_Component_have_heading_in_h2_inside_aboutheading_class', () => {
  render(<About />);

  // Assert that the h2 element with the class 'about' contains the specified text
  const aboutHeading = screen.getByRole('heading', { name: /About VeeVee Holiday/i });
  expect(aboutHeading).toBeInTheDocument();
  expect(aboutHeading).toHaveClass('aboutheading');
});


test('renders_AddBus_component_title_correctly', () => {
  render(<App />);
  
  const AddBusLink =  screen.getByText(/Add Bus/i)
  fireEvent.click(AddBusLink); 

  const titleElement = screen.getByText(/Add a New Bus/i);
  expect(titleElement).toBeInTheDocument();
});


test('renders_ViewBus_component_title_correctly', () => {
  render(<App />);
  
  const AddBusLink =  screen.getByText(/View Buses/i)
  fireEvent.click(AddBusLink); 

  const titleElement = screen.getByText(/Available Buses/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders_form_input_fields_and_labels', () => {
  render(<Bus />);

  // Assert that input fields and their associated labels are present in the document
  const idInput = screen.getByLabelText(/Bus ID:/i);
  const nameInput = screen.getByLabelText(/Bus Name:/i);
  const capacityInput = screen.getByLabelText(/Bus Capacity:/i);
  const servicedateInput = screen.getByLabelText(/Last Service Date:/i);
  const kilometerInput = screen.getByLabelText(/Total Kilometer:/i);
  const busTypeSelect = screen.getByLabelText(/Bus Type:/i);

  expect(idInput).toBeInTheDocument();
  expect(nameInput).toBeInTheDocument();
  expect(capacityInput).toBeInTheDocument();
  expect(servicedateInput).toBeInTheDocument();
  expect(kilometerInput).toBeInTheDocument();
  expect(busTypeSelect).toBeInTheDocument();
});

test('displays_validation_errors_with_empty_input', async () => {
  render(<Bus />);

  // Find the submit button and trigger the click event
  const submitButton = screen.getByText(/Submit/i);
  fireEvent.click(submitButton);

  await waitFor(() => {
    // Assert that validation errors are displayed for each input field
    expect(screen.getByText(/Bus ID is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Bus name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Bus capacity is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Service date is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Kilometer is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Bus type is required/i)).toBeInTheDocument();
  });
});

test('checks_submit_form_functionality', async () => {
  render(<Bus />);

  const idInput = screen.getByLabelText(/Bus ID:/i);
  const nameInput = screen.getByLabelText(/Bus Name:/i);
  const capacityInput = screen.getByLabelText(/Bus Capacity:/i);
  const servicedateInput = screen.getByLabelText(/Last Service Date:/i);
  const kilometerInput = screen.getByLabelText(/Total Kilometer:/i);
  const busTypeInput = screen.getByLabelText(/Bus Type:/i);

  fireEvent.change(idInput, { target: { value: '123' } });
  fireEvent.change(nameInput, { target: { value: 'Sample Bus' } });
  fireEvent.change(capacityInput, { target: { value: '50' } });
  fireEvent.change(servicedateInput, { target: { value: '2023-11-10' } });
  fireEvent.change(kilometerInput, { target: { value: '1000' } });
  fireEvent.change(busTypeInput, { target: { value: 'AC' } });

  const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({ ok: true });

  const submitButton = screen.getByText(/Submit/i);
  fireEvent.click(submitButton);

  expect(fetchMock).toHaveBeenCalledWith(
    expect.stringContaining('/addBus'),
    expect.objectContaining({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: 123,
        name: 'Sample Bus',
        capacity: 50,
        servicedate: '2023-11-10',
        Kilometer: 1000,
        BusType: 'AC'
      }),
    })
  );

  fetchMock.mockRestore();
});


test('fetches_data_from_the_backend_when_the_component_mounts', async () => {
  const mockData = [
    {
      id: 1,
      name: 'Bus 1',
      capacity: 50,
      servicedate: '2023-11-10',
      Kilometer: 1000,
      BusType: 'AC',
    },
    
  ];

  jest.spyOn(global, 'fetch').mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce(mockData),
    ok: true,
  });

  render(<App />);

  const AddBusLink =  screen.getByText(/View Buses/i)
  fireEvent.click(AddBusLink); 

  await waitFor(() => {
    expect(screen.getByText('Bus 1')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
    expect(screen.getByText('2023-11-10')).toBeInTheDocument();
    expect(screen.getByText('1000')).toBeInTheDocument();
    expect(screen.getByText('AC')).toBeInTheDocument();
    // Add more assertions based on your mock data
  });

  expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/getAllBus'), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
});